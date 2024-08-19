<script setup lang="ts">
const supplier_group = defineModel<string>('supplier_group')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const email = defineModel<string>('email')
const notes = defineModel<string>('notes')
</script>

<template>
  <base-card>
    <template #header>Suppliers</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="supplier_group" label="Supplier Group" />
      <base-input disabled v-model="code" label="Code" />
      <base-input disabled v-model="name" label="Name" />
      <base-input disabled v-model="address" label="Address" />
      <base-input disabled v-model="phone" label="Phone" />
      <base-input disabled v-model="email" label="Email" />
      <base-textarea disabled v-model="notes" label="Notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
