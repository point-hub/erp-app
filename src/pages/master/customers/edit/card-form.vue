<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const customer_group_id = defineModel<string>('customer_group_id')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const email = defineModel<string>('email')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref([])

watch(selected, () => {
  customer_group_id.value = selected.value.id ?? ''
})

watch(customer_group_id, () => {
  refetch()
})

const refetch = async () => {
  const response = await axios.get('/v1/master/customer-groups', {
    params: {
      page: 1
    }
  })

  if (response.status === 200) {
    options.value = response.data.data.map((data: { _id: string; code: string; name: string }) => {
      if (customer_group_id.value === data._id) {
        selected.value = {
          id: data._id,
          label: `[${data.code}] ${data.name}`
        }
      }
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })
  }
}

onMounted(async () => {})
</script>

<template>
  <base-card>
    <template #header>Customers</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-autocomplete
        required
        label="Customer Group"
        v-model="selected"
        :options="options"
        :errors="errors?.customer_group_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="address" label="Address" :errors="errors?.address" />
      <base-input v-model="phone" label="Phone" :errors="errors?.phone" />
      <base-input v-model="email" label="Email" :errors="errors?.email" />
      <base-input v-model="notes" label="Notes" :errors="errors?.notes" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
