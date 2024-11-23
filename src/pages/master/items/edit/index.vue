<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardChartOfAccount from './card-chart-of-account.vue'
import CardDna from './card-dna.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetItemApi } from './retrieve.api'
import { useUpdateItemApi } from './update.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getItemApi = useGetItemApi()
const updateItemApi = useUpdateItemApi()

const form = reactive(useForm())
const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.items?.update) {
    router.push('/unauthorized')
  }

  const response = await getItemApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.category = response.category
    form.data.chart_of_account = response.chart_of_account
    form.data.code = response.code
    form.data.name = response.name
    form.data.unit = response.unit
    form.data.notes = response.notes
    form.data.have_production_number = response.have_production_number
    form.data.have_an_expiry_date = response.have_an_expiry_date
  }
})

const onUpdate = async () => {
  if (!authStore.permission?.master?.items?.update) {
    router.push('/unauthorized')
  }

  const response = await updateItemApi.send(route.params.id.toString(), form.data, form.errors)

  if (response) router.push('/master/items')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.items?.update"
      :form-id="route.params.id.toString()"
      v-model:category="form.data.category"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:unit="form.data.unit"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <card-chart-of-account
      v-model="form.data.chart_of_account_id"
      v-model:selected="form.data.chart_of_account"
      :errors="form.errors"
    />

    <card-dna
      v-model:have_production_number="form.data.have_production_number"
      v-model:have_an_expiry_date="form.data.have_an_expiry_date"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.items?.update">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
