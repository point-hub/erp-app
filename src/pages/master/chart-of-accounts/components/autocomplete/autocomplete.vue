<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetChartOfAccountsApi } from './retrieve-all.api'

export interface ISelectedChartOfAccount {
  _id: string
  label: string
  number: string
  name: string
}

const _id = defineModel<string>()
const selected = defineModel<ISelectedChartOfAccount>('selected')
const required = defineModel<boolean>('required', { default: false })
const subledger = defineModel<string>('subledger', { default: '' })
const typeCode = defineModel<string>('typeCode', { default: '' })
const type = defineModel<string>('type', { default: '' })
const categoryCode = defineModel<string>('categoryCode', { default: '' })
const category = defineModel<string>('category', { default: '' })
const label = defineModel<string>('label', { default: 'Chart of Account' })
const border = defineModel<'full' | 'simple' | 'none'>('border')
const errors = defineModel<string[]>('errors')

const getChartOfAccountsApi = useGetChartOfAccountsApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

const apiCall = async () => {
  const response = await getChartOfAccountsApi.send(
    {
      label: search.value,
      subledger: subledger.value,
      category_code: categoryCode.value,
      category: category.value,
      type_code: typeCode.value,
      type: type.value
    },
    1
  )
  if (response?.data) {
    options.value = response.data.map((data: ISelectedChartOfAccount) => {
      return {
        _id: data._id,
        label: `[${data.number}] ${data.name}`,
        number: `${data.number}`,
        name: `${data.name}`
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
    :label="label"
    v-model="selected"
    v-model:query="search"
    :border="border"
    :is-loading="isLoading"
    :options="options"
    :errors="errors"
  />
</template>
