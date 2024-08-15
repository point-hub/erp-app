<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetWarehouseApi } from './get-warehouse.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getWarehouseApi = useGetWarehouseApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.warehouses?.read) {
    router.push('/unauthorized')
  }

  const response = await getWarehouseApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.branch = `[${response.branch.code}] ${response.branch.name}`
    form.data.code = response.code
    form.data.name = response.name
    form.data.address = response.address
    form.data.phone = response.phone
    form.data.notes = response.notes
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.warehouses?.read" :data="form.data" />

    <card-form
      v-if="authStore.permission?.master?.warehouses?.read"
      :form-id="route.params.id.toString()"
      v-model:branch="form.data.branch"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:notes="form.data.notes"
    />
  </div>
</template>
