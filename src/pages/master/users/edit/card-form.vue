<script setup lang="ts">
import { ref, watch } from 'vue'

import RoleAutocomplete, {
  type ISelectedRole
} from '@/pages/master/roles/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const name = defineModel<string>('name')
const username = defineModel<string>('username')
const email = defineModel<string>('email')
const role_id = defineModel<string>('role_id')
const role = defineModel<{ _id: string; code: string; name: string }>('role')
const errors = defineModel<IFormError>('errors')

const selected = ref<ISelectedRole>()

watch(role, () => {
  selected.value = {
    _id: `${role.value?._id}`,
    label: `[${role.value?.code}] ${role.value?.name}`,
    code: `${role.value?.code}`,
    name: `${role.value?.name}`
  }
})
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="flex flex-col gap-4 mt-5">
      <role-autocomplete
        required
        label="Role"
        v-model="role_id"
        v-model:selected="selected"
        :errors="errors?.role_id"
      />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input required v-model="username" label="Username" :errors="errors?.username" />
      <base-input required v-model="email" label="Email" :errors="errors?.email" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
