<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetBranchesApi } from './retrieve-all.api'

export interface ISelectedBranch {
  _id: string
  label: string
  code: string
  name: string
}

const _id = defineModel<string>()
const selected = defineModel<ISelectedBranch>('selected')
const required = defineModel<boolean>('required', { default: false })
const label = defineModel<string>('label', { default: 'Branch' })
const errors = ref<string[]>([])

const getBranchesApi = useGetBranchesApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

const apiCall = async () => {
  const response = await getBranchesApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      return {
        _id: `${data._id}`,
        label: `[${data.code}] ${data.name}`,
        code: `${data.code}`,
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
