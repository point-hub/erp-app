<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetPurchaseRequestApi } from './retrieve-all.api'
import type { IDetail, IReference } from '../../interface'

export interface ISelectedPurchaseRequest {
  _id: string
  form_number: string
  required_date: string
  details: IDetail
  references: IReference
}

const _id = defineModel<string>()
const options = defineModel<ISelectedPurchaseRequest[]>('options')
const selected = defineModel<ISelectedPurchaseRequest>('selected')
const required = defineModel<boolean>('required', { default: false })
const label = defineModel<string>('label')
const errors = ref<string[]>([])

const getPurchaseRequestsApi = useGetPurchaseRequestApi()
const search = ref('')
const isLoading = ref<boolean>(false)
const localOptions = ref<ISelectedPurchaseRequest[]>()

const apiCall = async () => {
  const response = await getPurchaseRequestsApi.send(search.value, 1)

  if (response?.data) {
    options.value = response.data.map((data: ISelectedPurchaseRequest) => {
      return {
        _id: data._id,
        label: data.form_number,
        details: data.details,
        references: data.references
      }
    })
  }
  // finish loading
  isLoading.value = false
}

watch(search, () => {
  // start loading without debounced for smooth ux
  if (!localOptions.value) {
    isLoading.value = true
  }
})

watchDebounced(
  search,
  async () => {
    if (!localOptions.value) {
      await apiCall()
    }
  },
  { debounce: 500, maxWait: 1000 }
)

watch(selected, () => {
  if (selected.value) _id.value = selected.value?._id
})

onMounted(async () => {
  if (!options.value) {
    await apiCall()
  } else {
    localOptions.value = options.value
  }
})
</script>

<template>
  <base-autocomplete
    :required="required"
    :label="label"
    v-model="selected"
    v-model:query="search"
    :is-loading="isLoading"
    :options="options"
    :errors="errors"
  />
</template>
