<script setup lang="ts">
import UserAutocomplete from '@/pages/master/users/components/autocomplete/user-autocomplete.vue'
import { useAuthStore } from '@/stores/auth.store'

import type { IFormError } from './form'

interface IApprovalTo {
  _id: string
  label: string
  name: string
  username: string
  email: string
}

const authStore = useAuthStore()
const approval_to = defineModel<IApprovalTo>('approval_to')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-input label="Created by" disabled layout="horizontal" v-model="authStore.name" />
      <user-autocomplete
        required
        label="Request approval to"
        layout="horizontal"
        v-model:selected="approval_to"
        :errors="errors?.approval_to"
      />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
