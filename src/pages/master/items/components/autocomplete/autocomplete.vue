<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetItemsApi } from './retrieve-all.api'

export interface ISelectedItem {
  _id: string
  label: string
  code: string
  name: string
  unit: string
}

const _id = defineModel<string>()
const options = defineModel<ISelectedItem[]>('options')
const selected = defineModel<ISelectedItem>('selected')
const required = defineModel<boolean>('required', { default: false })
const label = defineModel<string>('label', { default: 'Item' })
const errors = ref<string[]>([])

const getItemsApi = useGetItemsApi()
const search = ref('')
const isLoading = ref<boolean>(false)
const localOptions = ref<ISelectedItem[]>()

const apiCall = async () => {
  const response = await getItemsApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: ISelectedItem) => {
      return {
        _id: data._id,
        label: data.label,
        code: data.code,
        name: data.name,
        unit: data.unit
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
