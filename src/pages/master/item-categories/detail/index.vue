<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetItemCategoryApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getItemCategoryApi = useGetItemCategoryApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.items?.read) {
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
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.items?.read" :data="form.data" />

    <card-form
      v-if="authStore.permission?.master?.items?.read"
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:notes="form.data.notes"
    />
  </div>
</template>
