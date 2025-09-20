<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardApproval from './card-approval.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardDetails from './card-details.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useRetrievePurchaseInvoiceApi } from './retrieve.api'


const route = useRoute()
const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const isLoading = ref(false)
const retrievePurchaseInvoiceApi = useRetrievePurchaseInvoiceApi()

onMounted(async () => {
  isLoading.value = true
  if (!authStore.permission?.purchasing?.invoices?.read) {
    router.push('/unauthorized')
  }

  const response = await retrievePurchaseInvoiceApi.send(route.params.id.toString())

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const branches = authStore.branches.map((item: any) => item._id)
  if (!branches.includes(response.branch._id)) {
    router.push('/unauthorized')
  }

  form.data = response
  form.data.items = response.items
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center text-2xl gap-2">
    <base-loader />
  </div>
  <div v-else class="flex flex-col gap-4" ref="pdfContent">
    <card-breadcrumbs class="print:hidden!" />

    <card-action :data="form.data" class="print:hidden!" />

    <base-card bg-color="red" title-color="white" body-color="white" class="py-4! print:hidden!"
      v-if="form.data.is_deleted">
      <div>
        This Form is DELETED by {{ form.data.deleted_by.label }} because
        {{ form.data.deleted_reason }}
      </div>
    </base-card>

    <card-form :form_number="form.data.form_number" :supplier="form.data.supplier"
      :revised_count="form.data.revised_count" :branch="form.data.branch.label" :created_date="form.data.created_date"
      :due_date="form.data.due_date" />

    <card-details v-model:details="form.data.details" v-model:discount_type="form.data.discount_type"
      v-model:subtotal="form.data.subtotal" v-model:discount="form.data.discount" v-model:tax_base="form.data.tax_base"
      v-model:tax_type="form.data.tax_type" v-model:tax="form.data.tax"
      v-model:expedition_fee="form.data.expedition_fee" v-model:total="form.data.total" />

    <card-approval :created_by="form.data.created_by.label" :notes="form.data.notes" />

  </div>
</template>

<style scoped lang="postcss"></style>
