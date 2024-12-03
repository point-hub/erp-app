<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import type { ISelectedSupplier } from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'

import type { IDetail, IReference } from '../../interface'
import { useGetWarehousesApi } from './retrieve-all.api'

export interface ISelectedPurchaseOrder {
  _id: string
  label?: string
  supplier?: ISelectedSupplier
  form_number?: string
  required_date: string
  details: IDetail[]
  references: IReference[]
  subtotal: number
  discount: number
  tax_base: number
  tax_type: 'non' | 'include' | 'exclude'
  tax: number
  total: number
}

const _id = defineModel<string>()
const required = defineModel<boolean>('required', { default: false })
const required_down_payment = defineModel<boolean>('required_down_payment', { default: false })
const is_finished = defineModel<boolean>('is_finished', { default: false })
const has_invoice = defineModel<boolean>('has_invoice', { default: false })
const selected = defineModel<ISelectedPurchaseOrder>('selected')
const errors = ref<string[]>([])

const getWarehousesApi = useGetWarehousesApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

const apiCall = async () => {
  const response = await getWarehousesApi.send(search.value, 1, {
    required_down_payment: required_down_payment.value,
    is_finished: is_finished.value,
    has_invoice: has_invoice.value
  })
  console.log(response)
  if (response?.data) {
    options.value = response.data.map((data: ISelectedPurchaseOrder) => {
      return {
        _id: data._id,
        required_date: data.required_date,
        supplier: data.supplier,
        label: data.form_number,
        details: data.details,
        references: data.references,
        subtotal: data.subtotal,
        discount: data.discount,
        tax_base: data.tax_base,
        tax_type: data.tax_type,
        tax: data.tax,
        total: data.total
      }
    })
  }
  // finish loading
  isLoading.value = false
}

watch(search, () => {
  // start loading without debounced for smooth ux
  isLoading.value = true
})

watchDebounced(
  search,
  async () => {
    await apiCall()
  },
  { debounce: 500, maxWait: 1000 }
)

watch(selected, () => {
  _id.value = selected.value?._id
})

onMounted(async () => {
  await apiCall()
})
</script>

<template>
  <base-autocomplete
    :required="required"
    label="Purchase Order"
    v-model="selected"
    v-model:query="search"
    :is-loading="isLoading"
    :options="options"
    :errors="errors"
  />
</template>
