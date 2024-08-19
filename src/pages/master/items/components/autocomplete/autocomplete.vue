<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetItemsApi } from './retrieve-all.api'

const _id = defineModel<string>()
const required = defineModel<boolean>('required', { default: false })
const selected = defineModel<{ id: string; label: string }>('selected')
const errors = ref<string[]>([])

const getItemsApi = useGetItemsApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

const apiCall = async () => {
  const response = await getItemsApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
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
  _id.value = selected.value?.id
})

onMounted(async () => {
  await apiCall()
})
</script>

<template>
  <base-autocomplete
    :required="required"
    label="Item"
    v-model="selected"
    v-model:query="search"
    :is-loading="isLoading"
    :options="options"
    :errors="errors"
  />
</template>
