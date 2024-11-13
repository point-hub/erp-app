<script setup lang="ts">
import { onMounted, ref } from 'vue'

import axios from '@/axios'
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
const options = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/v1/master/users/authorized-users', {
      params: {
        filter: {
          permission: 'role.permission.purchasing.purchase_orders.approval'
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
      <user-autocomplete
        required
        label="Request approval to"
        layout="horizontal"
        :options="options"
        v-model:selected="approval_to"
        :errors="errors?.['approval_to._id']"
      />
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
