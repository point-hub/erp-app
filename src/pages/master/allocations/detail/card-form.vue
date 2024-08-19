<script setup lang="ts">
const allocation_group = defineModel<string>('allocation_group')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const notes = defineModel<string>('notes')
</script>

<template>
  <base-card>
    <template #header>Allocations</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="allocation_group" label="Allocation Group" />
      <base-input disabled v-model="code" label="Code" />
      <base-input disabled v-model="name" label="Name" />
      <base-textarea disabled v-model="notes" label="Notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
