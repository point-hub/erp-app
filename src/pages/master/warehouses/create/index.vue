<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateWarehouseApi } from './create-warehouse.api'
import { useForm } from './form'
import { useGetCountersApi } from './get-counters.api'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const getCountersApi = useGetCountersApi()
const createWarehousesApi = useCreateWarehouseApi()

onMounted(async () => {
  if (!authStore.permission?.master?.warehouses?.create) {
    router.push('/unauthorized')
  }
  const response = await getCountersApi.send('warehouses')
  if (response?.code) form.data.code = response.code
})

const onSave = async () => {
  if (!authStore.permission?.master?.warehouses?.create) {
    router.push('/unauthorized')
  }
  const response = await createWarehousesApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/master/warehouses')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.warehouses?.create"
      v-model:branch_id="form.data.branch_id"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.warehouses?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
