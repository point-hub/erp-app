<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardTable from './card-table.vue'
import { useCreateWarehouseApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createWarehousesApi = useCreateWarehouseApi()

onMounted(async () => {
  if (!authStore.permission?.purchasing?.purchase_orders?.create) {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  if (!authStore.permission?.purchasing?.purchase_orders?.create) {
    router.push('/unauthorized')
  }
  const response = await createWarehousesApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/purchasing/purchase-orders')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form v-model:branch="form.data.branch" :errors="form.errors" />

    <!-- <card-table v-model:items="form.data.items" />

    <card-approval
      v-model:approval_to="form.data.approval_to"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card> -->
  </div>
</template>

<style scoped lang="postcss"></style>
