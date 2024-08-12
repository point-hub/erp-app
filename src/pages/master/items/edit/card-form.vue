<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const category_id = defineModel<string>('category_id')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const unit = defineModel<string>('unit')
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref([])

watch(selected, () => {
  category_id.value = selected.value.id ?? ''
})

watch(category_id, () => {
  refetch()
})

const refetch = async () => {
  const response = await axios.get('/v1/item-categories', {
    params: {
      page: 1
    }
  })

  if (response.status === 200) {
    options.value = response.data.data.map((data: { _id: string; code: string; name: string }) => {
      if (category_id.value === data._id) {
        selected.value = {
          id: data._id,
          label: `[${data.code}] ${data.name}`
        }
      }
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })
  }
}

onMounted(async () => {})
</script>

<template>
  <base-card>
    <template #header>Items</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-autocomplete
        required
        label="Category"
        v-model="selected"
        :options="options"
        :errors="errors?.category_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input required v-model="unit" label="Unit" :errors="errors?.unit" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
