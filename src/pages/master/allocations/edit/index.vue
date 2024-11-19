<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetAllocationApi } from './retrieve.api'
import { useUpdateAllocationApi } from './update.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getAllocationApi = useGetAllocationApi()
const updateAllocationApi = useUpdateAllocationApi()

const form = reactive(useForm())
const formId = ref()
const allocation_group = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.allocations?.update) {
    router.push('/unauthorized')
  }

  const response = await getAllocationApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.allocation_group = response.allocation_group
    form.data.code = response.code
    form.data.name = response.name
    form.data.notes = response.notes

    allocation_group.value = response.allocation_group
  }
})

const onUpdate = async () => {
  if (!authStore.permission?.master?.allocations?.update) {
    router.push('/unauthorized')
  }

  const response = await updateAllocationApi.send(
    route.params.id.toString(),
    form.data,
    form.errors
  )

  if (response) router.push('/master/allocations')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.allocations?.update"
      :form-id="route.params.id.toString()"
      v-model:allocation_group="allocation_group"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.allocations?.update">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
