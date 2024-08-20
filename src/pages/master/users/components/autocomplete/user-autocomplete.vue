<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetUsersApi } from './get-users.api'

interface ISelected {
  _id: string
  label: string
  name: string
  username: string
  email: string
}

const _id = defineModel<string>()
const selected = defineModel<ISelected>('selected')
const errors = ref<string[]>([])

const getUsersApi = useGetUsersApi()
const search = ref('')
const options = ref([])
const isLoading = ref<boolean>(false)

const apiCall = async () => {
  const response = await getUsersApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: ISelected) => {
      return {
        label: `${data.name}`,
        _id: `${data._id}`,
        name: `${data.name}`,
        username: `${data.username}`,
        email: `${data.email}`
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
    required
    label="User"
    v-model="selected"
    v-model:query="search"
    :is-loading="isLoading"
    :options="options"
    :errors="errors"
  />
</template>
