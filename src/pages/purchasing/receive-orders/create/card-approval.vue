<script setup lang="ts">
import { onMounted, ref } from 'vue'

import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'

import type { IFormError } from './form'

const authStore = useAuthStore()
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors', { required: true })
const options = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/v1/master/users/authorized-users', {
      params: {
        filter: {
          permission: 'role.permission.purchasing.receive_orders.approval'
        },
        page: 1
      }
    })

    options.value = response.data.data

    return {
      data: response.data.data,
      pagination: response.data.pagination
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-input label="Created by" disabled layout="horizontal" v-model="authStore.name" />
      <base-textarea
        layout="horizontal"
        v-model="notes"
        label="Notes"
        :errors="errors?.notes"
        :minHeight="128"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
