<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetAllocationGroupApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getAllocationGroupApi = useGetAllocationGroupApi()

const form = reactive(useForm())

const formId = ref()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  if (!authStore.permission?.master?.allocations?.read) {
    router.push('/unauthorized')
  }

  const response = await getAllocationGroupApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.notes = response.notes
  }

  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center text-2xl gap-2">
    <base-loader />
  </div>
  <div v-else class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.allocations?.read" :data="form.data" />

    <card-form
      v-if="authStore.permission?.master?.allocations?.read"
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
    />
  </div>
</template>
