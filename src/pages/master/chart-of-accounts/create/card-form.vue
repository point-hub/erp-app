<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const type_id = defineModel<string>('type_id')
const category_id = defineModel<string>('category_id')
const number = defineModel<string>('number')
const name = defineModel<string>('name')
const subledger = defineModel<string>('subledger')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const optionsType = ref([])
const selectedType = ref()
const selectedCategory = ref()
const optionsCategory = ref([])
const selectedSubledger = ref()
const optionsSubledger = ref([
  { label: 'Item' },
  { label: 'Supplier' },
  { label: 'Customer' },
  { label: 'Expedition' },
  { label: 'Fixed Asset' }
])

watch(selectedCategory, () => {
  category_id.value = selectedCategory.value.id ?? ''
})

watch(selectedType, async () => {
  type_id.value = selectedType.value.id
  selectedCategory.value = { label: '' }
  await getAccountCategories(selectedType.value.id)
})

watch(
  () => selectedSubledger.value,
  () => {
    subledger.value = selectedSubledger.value.label
  }
)

const getAccountTypes = async () => {
  const response = await axios.get('/v1/master/chart-of-account-types', {
    params: {
      page: 1,
      page_size: 9999
    }
  })
  if (response.status === 200) {
    optionsType.value = response.data.data.map((data: { _id: string; name: string }) => {
      return {
        id: data._id,
        label: `${data.name}`
      }
    })
  }
}

const getAccountCategories = async (type_id: string) => {
  const response = await axios.get('/v1/master/chart-of-account-categories', {
    params: {
      filter: {
        type_id: `${type_id}`
      },
      page: 1,
      page_size: 9999
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
      <base-autocomplete
        required
        label="Category"
        v-model="selectedCategory"
        :options="optionsCategory"
        :errors="errors?.category_id"
      />
      <base-input required v-model="number" label="Number" :errors="errors?.number" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-autocomplete
        label="Subledger"
        v-model="selectedSubledger"
        :options="optionsSubledger"
        :errors="errors?.subledger"
      />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
