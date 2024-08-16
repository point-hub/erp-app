<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'
import { useGetChartOfAccountCategoriesApi } from './get-categories.api'

const type_id = defineModel<string>('type_id')
const type = defineModel<{ _id: string; name: string }>('type')
const category_id = defineModel<string>('category_id')
const category = defineModel<{ _id: string; name: string }>('category')
const number = defineModel<string>('number')
const name = defineModel<string>('name')
const subledger = defineModel<string>('subledger')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const optionsType = ref([])
const selectedType = ref()
const selectedCategory = ref()
const optionsCategory = ref([])

watch(type, () => {
  selectedType.value = {
    id: type.value?._id,
    label: `${type.value?.name}`
  }
})

watch(category, () => {
  selectedCategory.value = {
    id: category.value?._id,
    label: `${category.value?.name}`
  }
})

watch(selectedCategory, () => {
  category_id.value = selectedCategory.value.id ?? ''
})

watch(selectedType, async () => {
  type_id.value = selectedType.value.id
  await getAccountCategories(selectedType.value.id)
})

const getAccountTypes = async () => {
  const response = await axios.get('/v1/master/chart-of-account-types', {
    params: {
      page: 1
    }
  })
  if (response.status === 200) {
    optionsType.value = response.data.data.map((data: { _id: string; name: string }) => {
      return {
        id: data._id,
        label: `${data.name}`
      }
    })

    selectedType.value = optionsType.value[0]
  }
}

const getAccountCategories = async (type_id: string) => {
  const response = await axios.get('/v1/master/chart-of-account-categories', {
    params: {
      filter: {
        type_id: `${type_id}`
      },
      page: 1
    }
  })
  if (response.status === 200) {
    optionsCategory.value = response.data.data.map((data: { _id: string; name: string }) => {
      return {
        id: data._id,
        label: `${data.name}`
      }
    })
  }
}

onMounted(async () => {
  await getAccountTypes()
})

const searchCategory = ref('')
const isLoadingCategoryOptions = ref<boolean>(false)
const getCategoriesApi = useGetChartOfAccountCategoriesApi()
watch(searchCategory, () => {
  // start loading without debounced for smooth ux
  isLoadingCategoryOptions.value = true
})
watchDebounced(
  searchCategory,
  async (newVal) => {
    // call api
    const response = await getCategoriesApi.send(newVal, 1)
    if (response?.data) {
      optionsCategory.value = response.data.map((data: { _id: string; name: string }) => {
        return {
          id: data._id,
          label: `${data.name}`
        }
      })
    }
    // finish loading
    isLoadingCategoryOptions.value = false
  },
  { debounce: 500, maxWait: 1000 }
)
</script>

<template>
  <base-card>
    <template #header>Chart of Accounts</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-autocomplete
        required
        label="Type"
        v-model="selectedType"
        :options="optionsType"
        :errors="errors?.type_id"
      />
      {{ searchCategory }}
      <base-autocomplete
        required
        label="Category"
        v-model="selectedCategory"
        v-model:query="searchCategory"
        v-model:is-loading="isLoadingCategoryOptions"
        :options="optionsCategory"
        :errors="errors?.category_id"
      />
      <base-input required v-model="number" label="Number" :errors="errors?.number" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="subledger" label="Subledger" :errors="errors?.subledger" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
