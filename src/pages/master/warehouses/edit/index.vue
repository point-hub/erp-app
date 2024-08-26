<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetWarehouseApi } from './get-warehouse.api'
import { useUpdateWarehouseApi } from './update-warehouse.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getWarehouseApi = useGetWarehouseApi()
const updateWarehouseApi = useUpdateWarehouseApi()

const form = reactive(useForm())
const formId = ref()
const branch = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.warehouses?.update) {
    router.push('/unauthorized')
  }

  const response = await getWarehouseApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.branch_id = response.branch._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.address = response.address
    form.data.phone = response.phone
    form.data.notes = response.notes
    branch.value = response.branch
  }
})

const onUpdate = async () => {
  if (!authStore.permission?.master?.warehouses?.update) {
    router.push('/unauthorized')
  }

  const response = await updateWarehouseApi.send(route.params.id.toString(), form.data, form.errors)

  if (response) router.push('/master/warehouses')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.warehouses?.update"
      :form-id="route.params.id.toString()"
      v-model:branch_id="form.data.branch_id"
      v-model:branch="branch"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.warehouses?.update">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
