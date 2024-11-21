<script setup lang="ts">
import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import SupplierAutocomplete, {
  type ISelectedSupplier
} from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'
import PurchaseRequestAutocomplete, {
  type ISelectedPurchaseRequest
} from '@/pages/purchasing/purchase-requests/components/autocomplete/autocomplete.vue'
import type { IFormError } from './form'
import { watch } from 'vue'

const required_date = defineModel<Date>('required_date')
const branch = defineModel<ISelectedBranch>('branch', { required: true })
const supplierOptions = defineModel<ISelectedSupplier[]>('supplier_options')
const supplier = defineModel<ISelectedSupplier>('supplier')
const purchaseRequestOptions = defineModel<ISelectedPurchaseRequest[]>('purchase_request_options')
const purchaseRequest = defineModel<ISelectedPurchaseRequest>('purchase_request', {
  required: true
})
const errors = defineModel<IFormError>('errors')

watch(purchaseRequest, () => {
  if (purchaseRequest.value) required_date.value = purchaseRequest.value.required_date
})
</script>

<template>
  <base-card>
    <template #header>Purchase Orders</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input
        disabled
        required
        layout="horizontal"
        label="Branch"
        :modelValue="branch?.label"
      />

      <purchase-request-autocomplete
        required
        layout="horizontal"
        label="Purchase Request"
        v-model:selected="purchaseRequest"
        v-model:options="purchaseRequestOptions"
        :errors="errors?.['purchaseRequest._id']"
      />

      <supplier-autocomplete
        v-if="purchase_request"
        required
        layout="horizontal"
        label="Supplier"
        v-model:selected="supplier"
        v-model:options="supplierOptions"
        :errors="errors?.['supplier._id']"
      />

      <base-datepicker
        required
        v-if="purchase_request"
        v-model="required_date"
        label="Required Date"
        layout="horizontal"
        description="when the item is required to be shipped?"
        :errors="errors?.required_date"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
