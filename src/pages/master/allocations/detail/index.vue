<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetAllocationApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getAllocationApi = useGetAllocationApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.allocations?.read) {
    router.push('/unauthorized')
  }

  const response = await getAllocationApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.allocation_group = `[${response.allocation_group.code}] ${response.allocation_group.name}`
    form.data.code = response.code
    form.data.name = response.name
    form.data.notes = response.notes
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.allocations?.read" :data="form.data" />

    <card-form
      v-if="authStore.permission?.master?.allocations?.read"
      :form-id="route.params.id.toString()"
      v-model:allocation_group="form.data.allocation_group"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
    />
  </div>
</template>
