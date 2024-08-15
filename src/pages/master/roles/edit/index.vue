<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardPermissions from './card-permissions.vue'
import { useForm } from './form'
import { useGetRoleApi } from './get-role.api'
import { useUpdateRoleApi } from './update-role.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getRoleApi = useGetRoleApi()
const updateRoleApi = useUpdateRoleApi()

const form = reactive(useForm())
const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.roles?.update) {
    router.push('/unauthorized')
  }

  const response = await getRoleApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.permission = response.permission
    form.data.notes = response.notes
  }
})

const onUpdate = async () => {
  if (!authStore.permission?.master?.roles?.update) {
    router.push('/unauthorized')
  }

  const response = await updateRoleApi.send(route.params.id.toString(), form.data, form.errors)

  if (response) router.push('/master/roles')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.roles?.update"
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:notes="form.data.notes"
    />

    <card-permissions v-model:permission="form.data.permission" />

    <base-card class="py-4!" v-if="authStore.permission?.master?.roles?.update">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
