<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetBranchesApi } from './get-branches.api'

const _id = defineModel<string>()
const selected = defineModel<{ id: string; label: string }>('selected')
const errors = ref<string[]>([])

const getBranchesApi = useGetBranchesApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

watch(search, () => {
  // start loading without debounced for smooth ux
  isLoading.value = true
})

watchDebounced(
  search,
  async (val) => {
    // call api
    const response = await getBranchesApi.send({ label: val }, 1)
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
  },
  { debounce: 500, maxWait: 1000 }
)

watch(selected, () => {
  _id.value = selected.value?.id
})

onMounted(async () => {
  const response = await getBranchesApi.send({ label: search.value }, 1)
  if (response?.data) {
    options.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })

    if (!selected.value?.id) {
      selected.value = options.value[0]
    }
  }
})
</script>

<template>
  <base-autocomplete
    required
    label="Branch"
    v-model="selected"
    v-model:query="search"
    :is-loading="isLoading"
    :options="options"
    :errors="errors"
  />
</template>
