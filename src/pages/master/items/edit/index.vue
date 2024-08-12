<script setup lang="ts">
import { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardChartOfAccount from './card-chart-of-account.vue'
import CardDna from './card-dna.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const route = useRoute()
const router = useRouter()
const { toastRef } = useToastStore()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = (await axios.get(`/v1/items/${route.params.id}`)).data
  formId.value = response._id
  form.data.chart_of_account_id = response.chart_of_account._id
  form.data.chart_of_account = response.chart_of_account
  form.data.category_id = response.category._id
  form.data.category = response.category
  form.data.code = response.code
  form.data.name = response.name
  form.data.unit = response.unit
  form.data.have_production_number = response.have_production_number
  form.data.have_an_expiry_date = response.have_an_expiry_date
})

const onUpdate = async () => {
  try {
    const response = await axios.patch(`/v1/items/${route.params.id}`, form.data)
    if (response.status === 200) {
      toastRef.toast('Update success', { color: 'success' })
      router.push('/master/items')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      var listErrors: string[] = []
      const formErrors = error?.response?.data?.errors
      if (formErrors) {
        for (const key in formErrors) {
          form.errors[key] = formErrors[key]
          listErrors.push(formErrors[key])
        }
      }
      toastRef.toast(error.response?.data.message, {
        lists: listErrors.flat(),
        color: 'danger'
      })
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    {{ form.data }}
    <card-form
      :form-id="route.params.id.toString()"
      v-model:category_id="form.data.category_id"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:unit="form.data.unit"
      :errors="form.errors"
    />

    <card-chart-of-account
      v-model:chart_of_account_id="form.data.chart_of_account_id"
      :errors="form.errors"
    />

    <card-dna
      v-model:have_production_number="form.data.have_production_number"
      v-model:have_an_expiry_date="form.data.have_an_expiry_date"
      :errors="form.errors"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
