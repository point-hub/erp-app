<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardPermissions from './card-permissions.vue'
import { useCreateRoleApi } from './create-role.api'
import { useForm } from './form'
import { useGetCountersApi } from './get-counters.api'
import { useGetPermissionsApi } from './get-permissions.api'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const getCountersApi = useGetCountersApi()
const getPermissionsApi = useGetPermissionsApi()
const createRolesApi = useCreateRoleApi()

onMounted(async () => {
  if (!authStore.permission?.master?.roles?.create) {
    router.push('/unauthorized')
  }

  const responsePermissions = await getPermissionsApi.send()

  if (responsePermissions) {
    form.data.permission = responsePermissions
  }

  const response = await getCountersApi.send('roles')

  if (response?.code) form.data.code = response.code
})

const onSave = async () => {
  if (!authStore.permission?.master?.roles?.create) {
    router.push('/unauthorized')
  }

  const response = await createRolesApi.send(form.data, form.errors)

  if (response?.inserted_id) router.push('/master/roles')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.roles?.create"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <card-permissions v-model:permission="form.data.permission" :errors="form.errors" />

    <base-card class="py-4!" v-if="authStore.permission?.master?.roles?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
