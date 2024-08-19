<script setup lang="ts">
import ItemCategoryAutocomplete from '@/pages/master/item-categories/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const category_id = defineModel<string>('category_id')
const category = defineModel<{ id: string; label: string; code: string }>('category')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const unit = defineModel<string>('unit')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Items</template>

    <div class="flex flex-col gap-4 mt-5">
      <item-category-autocomplete
        required
        label="Category"
        v-model="category_id"
        v-model:selected="category"
        :errors="errors?.category_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="unit" label="Unit" :errors="errors?.unit" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
