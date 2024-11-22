<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBank from './card-bank.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateCustomerApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createCustomersApi = useCreateCustomerApi()

onMounted(async () => {
  if (!authStore.permission?.master?.customers?.create) {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  if (!authStore.permission?.master?.customers?.create) {
    router.push('/unauthorized')
  }
  const response = await createCustomersApi.send(form.data, form.errors)
  if (response?.inserted_id) router.push('/master/customers')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.customers?.create"
      v-model:customer_group="form.data.customer_group"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:email="form.data.email"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <card-bank
      v-model:name="form.data.bank_name"
      v-model:branch="form.data.bank_branch"
      v-model:account_name="form.data.bank_account_name"
      v-model:account_number="form.data.bank_account_number"
      :errors="form.errors"
    />

    <base-card class="py-4!" v-if="authStore.permission?.master?.customers?.create">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
