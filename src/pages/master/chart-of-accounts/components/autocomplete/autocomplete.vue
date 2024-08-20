<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetChartOfAccountsApi } from './retrieve-all.api'

interface ISelected {
  _id: string
  label: string
  number: string
  name: string
}

const _id = defineModel<string>()
const selected = defineModel<ISelected>('selected')
const required = defineModel<boolean>('required', { default: false })
const subledger = defineModel<string>('subledger', { default: '' })
const label = defineModel<string>('label', { default: 'Chart of Account' })
const errors = ref<string[]>([])

const getChartOfAccountsApi = useGetChartOfAccountsApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

const apiCall = async () => {
  const response = await getChartOfAccountsApi.send(
    {
      label: search.value,
      subledger: subledger.value
    },
    1
  )
  if (response?.data) {
    options.value = response.data.map((data: ISelected) => {
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
    :is-loading="isLoading"
    :options="options"
    :errors="errors"
  />
</template>
