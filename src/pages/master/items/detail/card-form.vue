<script setup lang="ts">
import { ref, watch } from 'vue'

const category = defineModel<{
  code: string
  name: string
}>('category')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const unit = defineModel<string>('unit')

const categoryModel = ref()
watch(category, () => {
  categoryModel.value = `[${category.value?.code}] ${category.value?.name}`
})
</script>

<template>
  <base-card>
    <template #header>Items</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input label="Category" disabled v-model="categoryModel" />
      <base-input label="Code" disabled v-model="code" />
      <base-input label="Name" disabled v-model="name" />
      <base-input label="Unit" disabled v-model="unit" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
