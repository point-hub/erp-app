<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardChartOfAccount from './card-chart-of-account.vue'
import CardDna from './card-dna.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetItemApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getItemApi = useGetItemApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.items?.read) {
    router.push('/unauthorized')
  }

  const response = await getItemApi.send(route.params.id.toString())

  if (response) {
    console.log(response.chart_of_account)
    formId.value = response._id
    form.data.chart_of_account = `[${response.chart_of_account.number}] ${response.chart_of_account.name}`
    form.data.category = `[${response.category.code}] ${response.category.name}`
    form.data.code = response.code
    form.data.name = response.name
    form.data.unit = response.unit
    form.data.notes = response.notes
    form.data.have_production_number = response.have_production_number
    form.data.have_an_expiry_date = response.have_an_expiry_date
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action :data="form.data" />

    <card-form
      :form-id="route.params.id.toString()"
      v-model:category="form.data.category"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:unit="form.data.unit"
      v-model:notes="form.data.notes"
    />

    <card-chart-of-account v-model:chart_of_account="form.data.chart_of_account" />

    <card-dna
      v-model:have_production_number="form.data.have_production_number"
      v-model:have_an_expiry_date="form.data.have_an_expiry_date"
    />
  </div>
</template>
