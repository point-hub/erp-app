<script setup lang="ts">
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
</script>

<template>
  <base-card>
    <template #header>Branches</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="code" label="Code" />
      <base-input disabled v-model="name" label="Name" />
      <base-input disabled v-model="address" label="Address" />
      <base-input disabled v-model="phone" label="Phone" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
