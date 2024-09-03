<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBank from './card-bank.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetCustomerApi } from './retrieve.api'
import { useUpdateCustomerApi } from './update.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getCustomerApi = useGetCustomerApi()
const updateCustomerApi = useUpdateCustomerApi()

const form = reactive(useForm())
const formId = ref()
const customer_group = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.customers?.update) {
    router.push('/unauthorized')
  }

  const response = await getCustomerApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.customer_group_id = response.customer_group._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.address = response.address
    form.data.phone = response.phone
    form.data.email = response.email
    form.data.notes = response.notes
    form.data.bank_name = response.bank_name
    form.data.bank_branch = response.bank_branch
    form.data.bank_account_name = response.bank_account_name
    form.data.bank_account_number = response.bank_account_number

    customer_group.value = response.customer_group
  }
})

const onUpdate = async () => {
  if (!authStore.permission?.master?.customers?.update) {
    router.push('/unauthorized')
  }

  const response = await updateCustomerApi.send(route.params.id.toString(), form.data, form.errors)

  if (response) router.push('/master/customers')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-if="authStore.permission?.master?.customers?.update"
      :form-id="route.params.id.toString()"
      v-model:customer_group_id="form.data.customer_group_id"
      v-model:customer_group="customer_group"
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

    <base-card class="py-4!" v-if="authStore.permission?.master?.customers?.update">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
