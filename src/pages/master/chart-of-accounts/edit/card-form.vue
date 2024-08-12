<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const type_id = defineModel<string>('type_id')
const category_id = defineModel<string>('category_id')
const number = defineModel<number>('number')
const name = defineModel<string>('name')
const subledger = defineModel<string>('subledger')
const errors = defineModel<IFormError>('errors')

const optionsType = ref([])
const selectedType = ref()
const selectedCategory = ref()
const optionsCategory = ref([])

watch(selectedCategory, () => {
  category_id.value = selectedCategory.value.id ?? ''
})

watch(selectedType, async () => {
  type_id.value = selectedType.value.id
  await getAccountCategories(selectedType.value.id)
})

const getAccountTypes = async () => {
  const response = await axios.get('/v1/chart-of-account-types', {
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
  const response = await axios.get('/v1/chart-of-account-categories', {
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

    selectedCategory.value = optionsCategory.value[0]
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
      <base-input required type="number" v-model="number" label="Number" :errors="errors?.number" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="subledger" label="Subledger" :errors="errors?.subledger" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
