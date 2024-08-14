<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const unit = defineModel<string>('unit')
const category_id = defineModel<string>('category_id')
const category = defineModel('category')
const errors = defineModel<IFormError>('errors')

const selectedCategory = ref()
const optionsCategory = ref([])

watch(selectedCategory, () => {
  category_id.value = selectedCategory.value.id ?? ''
  category.value = selectedCategory.value
})

onMounted(async () => {
  const response = await axios.get('/v1/master/item-categories', {
    params: {
      page: 1
    }
  })
  if (response.status === 200) {
    optionsCategory.value = response.data.data.map(
      (data: { _id: string; code: string; name: string }) => {
        return {
          id: data._id,
          code: data.code,
          label: `[${data.code}] ${data.name}`
        }
      }
    )

    selectedCategory.value = optionsCategory.value[0]
  }
})
</script>

<template>
  <base-card>
    <template #header>Items</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-autocomplete
        required
        label="Category"
        v-model="selectedCategory"
        :options="optionsCategory"
        :errors="errors?.category_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input required v-model="unit" label="Unit" :errors="errors?.unit" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
