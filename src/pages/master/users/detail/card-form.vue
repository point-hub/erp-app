<script setup lang="ts">
import { ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const username = defineModel<string>('username')
const email = defineModel<string>('email')
const role_id = defineModel<string>('role_id')
const errors = defineModel<IFormError>('errors')
const role = ref()

const selected = ref()
const options = ref([])

watch(role_id, () => {
  refetch()
})

const refetch = async () => {
  const response = await axios.get('/v1/roles', {
    params: {
      page: 1
    }
  })
  if (response.status === 200) {
    options.value = response.data.data.map((data: { _id: string; code: string; name: string }) => {
      if (data._id === role_id.value) {
        role.value = `[${data.code}] ${data.name}`
      }
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })

    selected.value = options.value[0]
  }
}
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="name" label="Name" :errors="errors?.name" />
      <base-input disabled v-model="username" label="Username" :errors="errors?.username" />
      <base-input disabled v-model="email" label="Email" :errors="errors?.email" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
