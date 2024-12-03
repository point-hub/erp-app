<script setup lang="ts">
import { watch } from 'vue'

import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import { type ISelectedSupplier } from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'
import PurchaseOrderAutocomplete, {
  type ISelectedPurchaseOrder
} from '@/pages/purchasing/purchase-orders/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const required_date = defineModel<string>('required_date')
const branch = defineModel<ISelectedBranch>('branch')
const supplier = defineModel<ISelectedSupplier>('supplier')
const purchase_order = defineModel<ISelectedPurchaseOrder>('purchase_order')
const errors = defineModel<IFormError>('errors')

watch(purchase_order, () => {
  if (purchase_order.value) required_date.value = purchase_order.value.required_date
})
</script>

<template>
  <base-card>
    <template #header>Purchase Invoices</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input
        disabled
        required
        layout="horizontal"
        label="Branch"
        :modelValue="branch?.label"
      />

      <purchase-order-autocomplete
        required
        layout="horizontal"
        label="Purchase Order"
        :is_finished="true"
        :has_invoice="false"
        v-model:selected="purchase_order"
        :errors="errors?.['purchase_order._id']"
      />

      <base-input
        v-if="supplier"
        required
        disabled
        layout="horizontal"
        label="Supplier"
        :modelValue="supplier.label"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
