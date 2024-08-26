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
const required = defineModel<boolean>('required', { default: false })
const selected = defineModel<ISelectedItem>('selected')
const errors = ref<string[]>([])

const getItemsApi = useGetItemsApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

const apiCall = async () => {
  const response = await getItemsApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: ISelectedItem) => {
      return {
        _id: data._id,
        label: `[${data.code}] ${data.name}`,
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
  options.value = []
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
  <base-choosen
    title="Item"
    v-model:search="search"
    v-model:selected="selected"
    :is-loading="isLoading"
    :required="required"
    :options="options"
    :errors="errors"
    border="full"
  />
</template>
