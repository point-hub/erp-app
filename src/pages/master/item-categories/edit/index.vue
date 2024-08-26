<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetItemCategoryApi } from './retrieve.api'
import { useUpdateItemCategoryApi } from './update.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getItemCategoryApi = useGetItemCategoryApi()
const updateItemCategoryApi = useUpdateItemCategoryApi()

const form = reactive(useForm())
const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.items?.update) {
    router.push('/unauthorized')
  }

  const response = await getItemCategoryApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.notes = response.notes
  }
})

const onUpdate = async () => {
  if (!authStore.permission?.master?.items?.update) {
    router.push('/unauthorized')
  }

  const response = await updateItemCategoryApi.send(
    route.params.id.toString(),
    form.data,
    form.errors
  )

  if (response) router.push('/master/item-categories')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.items?.update"
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.items?.update">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
