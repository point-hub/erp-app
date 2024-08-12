<script setup lang="ts">
import { AxiosError } from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardChartOfAccount from './card-chart-of-account.vue'
import CardDna from './card-dna.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'

const router = useRouter()
const { toastRef } = useToastStore()
const form = reactive(useForm())
const category = ref({ code: 'ITEM' })

const showApiKeyModal = ref(false)
const toggleApiKeyModal = (value: boolean) => {
  let newValue = !showApiKeyModal.value
  if (value === true) newValue = true
  if (value === false) newValue = false
  showApiKeyModal.value = newValue
}

const onSave = async () => {
  try {
    const response = await axios.post('/v1/items', form.data)
    if (response.status === 201) {
      toastRef.toast('Create success', { color: 'success' })
      toggleApiKeyModal(true)
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

watch(category, async () => {
  const response = await axios.get('/v1/counters', {
    params: {
      filter: {
        name: `items-${category.value?.code}`
      }
    }
  })
  if (response.status === 200) {
    counter.value += Number(response?.data?.data[0]?.count ?? 0) + 1
    form.data.code = `${category.value?.code}${counter.value.toString().padStart(4, '0')}`
  }
})

const counter = ref(0)
onMounted(async () => {
  const response = await axios.get('/v1/counters', {
    params: {
      filter: {
        name: `items-${category.value?.code}`
      }
    }
  })
  if (response.status === 200) {
    counter.value += Number(response?.data?.data[0]?.count ?? 0) + 1
    form.data.code = `${category.value?.code}${counter.value.toString().padStart(4, '0')}`
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-model:category_id="form.data.category_id"
      v-model:category="category"
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
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
