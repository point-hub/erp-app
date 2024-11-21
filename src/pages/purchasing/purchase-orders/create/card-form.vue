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

const required_date = defineModel<string>('required_date')
const branch = defineModel<ISelectedBranch>('branch')
const supplier = defineModel<ISelectedSupplier>('supplier')
const purchaseRequest = defineModel<ISelectedPurchaseRequest>('purchase_request')
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
        :errors="errors?.['purchaseRequest._id']"
      />

      <supplier-autocomplete
        v-if="purchase_request"
        required
        layout="horizontal"
        label="Supplier"
        v-model:selected="supplier"
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
