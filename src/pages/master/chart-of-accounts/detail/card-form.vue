<script setup lang="ts">
const type = defineModel<string>('type')
const category = defineModel<string>('category')
const number = defineModel<string>('number')
const name = defineModel<string>('name')
const subledger = defineModel<string>('subledger')
const notes = defineModel<string>('notes')
</script>

<template>
  <base-card>
    <template #header>Chart of Accounts</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled label="Type" v-model="type" />
      <base-input disabled label="Category" v-model="category" />
      <base-input disabled label="Number" v-model="number" />
      <base-input disabled label="Name" v-model="name" />
      <base-input disabled label="Subledger" v-model="subledger" />
      <base-textarea disabled label="Notes" v-model="notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
