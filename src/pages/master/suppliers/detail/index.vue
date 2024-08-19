<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBank from './card-bank.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetSupplierApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getSupplierApi = useGetSupplierApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (!authStore.permission?.master?.suppliers?.read) {
    router.push('/unauthorized')
  }

  const response = await getSupplierApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.supplier_group = `[${response.supplier_group.code}] ${response.supplier_group.name}`
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
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action v-if="authStore.permission?.master?.suppliers?.read" :data="form.data" />

    <card-form
      v-if="authStore.permission?.master?.suppliers?.read"
      :form-id="route.params.id.toString()"
      v-model:supplier_group="form.data.supplier_group"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:address="form.data.address"
      v-model:phone="form.data.phone"
      v-model:email="form.data.email"
      v-model:notes="form.data.notes"
    />

    <card-bank
      v-model:name="form.data.bank_name"
      v-model:branch="form.data.bank_branch"
      v-model:account_name="form.data.bank_account_name"
      v-model:account_number="form.data.bank_account_number"
    />
  </div>
</template>
