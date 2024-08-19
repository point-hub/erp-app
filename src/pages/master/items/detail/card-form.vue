<script setup lang="ts">
const category = defineModel<string>('category')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const unit = defineModel<string>('unit')
const notes = defineModel<string>('notes')
</script>

<template>
  <base-card>
    <template #header>Items</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="category" label="Category" />
      <base-input disabled v-model="code" label="Code" />
      <base-input disabled v-model="name" label="Name" />
      <base-input disabled v-model="unit" label="Unit" />
      <base-textarea disabled v-model="notes" label="Notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
