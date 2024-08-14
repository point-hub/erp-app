<script setup lang="ts">
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const notes = defineModel<string>('notes')
</script>

<template>
  <base-card>
    <template #header>Machines</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="code" label="Code" />
      <base-input disabled v-model="name" label="Name" />
      <base-input disabled v-model="address" label="Address" />
      <base-input disabled v-model="phone" label="Phone" />
      <base-textarea disabled v-model="notes" label="Notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
