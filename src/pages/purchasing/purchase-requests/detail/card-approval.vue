<script setup lang="ts">
const created_by = defineModel<string>('created_by')
const approval_to = defineModel<string>('approval_to')
const notes = defineModel<string>('notes')
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-input label="Created by" disabled layout="horizontal" :modelValue="created_by" />
      <base-input
        disabled
        label="Request approval to"
        layout="horizontal"
        :modelValue="approval_to"
      />
      <base-textarea
        disabled
        layout="horizontal"
        :modelValue="notes"
        label="Notes"
        :minHeight="128"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
