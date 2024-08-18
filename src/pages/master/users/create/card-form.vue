<script setup lang="ts">
import RoleAutocomplete from '@/pages/master/roles/components/autocomplete/role-autocomplete.vue'

import type { IFormError } from './form'

const name = defineModel<string>('name')
const username = defineModel<string>('username')
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const role_id = defineModel<string>('role_id')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="flex flex-col gap-4 mt-5">
      <role-autocomplete required label="Role" v-model="role_id" :errors="errors?.role_id" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input required v-model="username" label="Username" :errors="errors?.username" />
      <base-input required v-model="email" label="Email" :errors="errors?.email" />
      <base-input
        required
        type="password"
        v-model="password"
        label="Password"
        :errors="errors?.password"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
