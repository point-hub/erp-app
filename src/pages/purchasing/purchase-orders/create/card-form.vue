<script setup lang="ts">
import BranchAutocomplete, {
  type ISelectedBranch
} from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import SupplierAutocomplete, {
  type ISelectedSupplier
} from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'
import PurchaseRequestAutocomplete, {
  type ISelectedPurchaseRequest
} from '@/pages/purchasing/purchase-requests/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const options = defineModel<ISelectedBranch[]>('options')
const branch = defineModel<ISelectedBranch>('branch')
const supplierOptions = defineModel<ISelectedSupplier[]>('supplier_options')
const supplier = defineModel<ISelectedSupplier>('supplier')
const purchaseRequestOptions = defineModel<ISelectedPurchaseRequest[]>('purchase_request_options')
const purchaseRequest = defineModel<ISelectedPurchaseRequest>('purchase_request')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Purchase Orders</template>

    <div class="flex flex-col gap-4 mt-5">
      <branch-autocomplete
        required
        layout="horizontal"
        label="Branch"
        v-model:selected="branch"
        v-model:options="options"
        :errors="errors?.['branch._id']"
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
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
