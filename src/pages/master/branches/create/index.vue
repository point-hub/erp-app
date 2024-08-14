<script setup lang="ts">
import { AxiosError } from 'axios'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetCountersApi } from './get-counters.api'

const router = useRouter()
const { toastRef } = useToastStore()
const form = reactive(useForm())
const authStore = useAuthStore()
const getCountersApi = useGetCountersApi()

onMounted(async () => {
  if (!authStore.permission?.master?.branches?.create) {
    router.push('/unauthorized')
  }

  const response = await getCountersApi.send('branches')

  if (response) form.data.code = response
})

const onSave = async () => {
  try {
    const response = await axios.post('/v1/branches', form.data)
    if (response.status === 201) {
      toastRef.toast('Create success', { color: 'success' })
      router.push('/master/branches')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      var listErrors: string[] = []
      const formErrors = error?.response?.data?.errors
      if (formErrors) {
        for (const key in formErrors) {
          form.errors[key] = formErrors[key]
          listErrors.push(formErrors[key])
        }
      }
      toastRef.toast(error.response?.data.message, {
        lists: listErrors.flat(),
        color: 'danger'
      })
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.branches?.create"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.branches?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
