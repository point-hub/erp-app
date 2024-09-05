<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetUsersApi } from './get-users.api'

interface ISelectedUser {
  _id: string
  label: string
  name: string
  username: string
  email: string
}

const _id = defineModel<string>()
const options = defineModel<ISelectedUser[]>('options')
const selected = defineModel<ISelectedUser>('selected')
const required = defineModel<boolean>('required', { default: false })
const label = defineModel<string>('label', { default: 'User' })
const errors = ref<string[]>([])

const getUsersApi = useGetUsersApi()
const search = ref('')
const isLoading = ref<boolean>(false)
const localOptions = ref<ISelectedUser[]>()

const apiCall = async () => {
  const response = await getUsersApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: ISelectedUser) => {
      return {
        label: data.name,
        _id: data._id,
        name: data.name,
        username: data.username,
        email: data.email
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
