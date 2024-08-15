<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete-modal.vue'
import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetChartOfAccountApi } from './get-chart-of-account.api'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()

const form = reactive(useForm())
const getChartOfAccountApi = useGetChartOfAccountApi()
const authStore = useAuthStore()
const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.chart_of_accounts?.read) {
    router.push('/unauthorized')
  }

  const response = await getChartOfAccountApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.type = response.type
    form.data.category = response.category
    form.data.number = response.number
    form.data.name = response.name
    form.data.subledger = response.subledger
    form.data.notes = response.notes
  }
})

const onDeleted = async () => {
  router.push('/master/chart-of-accounts')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action />

    <card-form
      :form-id="route.params.id.toString()"
      v-model:type="form.data.type.name"
      v-model:category="form.data.category.name"
      v-model:number="form.data.number"
      v-model:name="form.data.name"
      v-model:subledger="form.data.subledger"
      v-model:notes="form.data.notes"
    />

    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </div>
</template>
