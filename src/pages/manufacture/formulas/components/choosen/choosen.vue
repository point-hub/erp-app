<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetFormulasApi } from './retrieve-all.api'

export interface ISelectedFormula {
  _id: string
  label: string
  code: string
  name: string
}

const _id = defineModel<string>()
const options = defineModel<ISelectedFormula[]>('options')
const selected = defineModel<ISelectedFormula>('selected')
const required = defineModel<boolean>('required', { default: false })
const title = defineModel<string>('title', { default: 'Formula' })
const border = defineModel<'full' | 'simple' | 'none'>('border')
const errors = defineModel<string[]>('errors')

const getFormulasApi = useGetFormulasApi()
const search = ref('')
const isLoading = ref<boolean>(false)
const localOptions = ref<ISelectedFormula[]>()

const apiCall = async () => {
  const response = await getFormulasApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: ISelectedFormula) => {
      return {
        _id: data._id,
        label: data.label,
        code: data.code,
        name: data.name
      }
    })
  }
  // finish loading
  isLoading.value = false
}

watch(search, () => {
  // start loading without debounced for smooth ux
  if (!localOptions.value) {
    options.value = []
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

watch(
  selected,
  () => {
    if (selected.value) _id.value = selected.value._id
  },
  { immediate: true, deep: true }
)

onMounted(async () => {
  if (!options.value) {
    await apiCall()
  } else {
    localOptions.value = options.value
  }
})
</script>

<template>
  <base-choosen
    :title="title"
    v-model:search="search"
    v-model:selected="selected"
    :is-loading="isLoading"
    :required="required"
    :options="options"
    :errors="errors"
    :border="border"
  />
</template>
