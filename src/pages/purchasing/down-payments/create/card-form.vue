<script setup lang="ts">
import { ref, watch } from 'vue'

import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import { type ISelectedSupplier } from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'
import PurchaseOrderAutocomplete, {
  type ISelectedPurchaseOrder
} from '@/pages/purchasing/purchase-orders/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const required_date = defineModel<string>('required_date')
const amount = defineModel<number>('amount')
const payment_type = defineModel<string>('payment_type')
const branch = defineModel<ISelectedBranch>('branch')
const supplier = defineModel<ISelectedSupplier>('supplier')
const purchaseOrder = defineModel<ISelectedPurchaseOrder>('purchase_order')
const errors = defineModel<IFormError>('errors')

const paymentTypeOptions = [
  {
    label: 'Cash',
    value: 'cash'
  },
  {
    label: 'Bank',
    value: 'bank'
  }
]

const selectedPaymentType = ref()

watch(selectedPaymentType, () => {
  payment_type.value = selectedPaymentType.value.value
})

watch(purchaseOrder, () => {
  if (purchaseOrder.value) required_date.value = purchaseOrder.value.required_date
})
</script>

<template>
  <base-card>
    <template #header>Down Payments</template>

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
        :required_down_payment="true"
        layout="horizontal"
        label="Purchase Order"
        v-model:selected="purchaseOrder"
        :errors="errors?.['purchase_order._id']"
      />

      <base-input
        v-if="supplier"
        required
        disabled
        layout="horizontal"
        label="Supplier"
        v-model="supplier.label"
        :errors="errors?.['supplier._id']"
      />

      <base-datepicker
        required
        disabled
        v-if="purchase_order"
        v-model="required_date"
        label="Required Date"
        layout="horizontal"
        description="when the item is required to be shipped?"
        :errors="errors?.required_date"
      />

      <base-radio
        required
        v-if="purchase_order"
        label="Payment Type"
        name="radio-option"
        :options="paymentTypeOptions"
        v-model="selectedPaymentType"
        layout="horizontal"
      />

      <base-input-number
        v-if="purchase_order"
        required
        align="left"
        layout="horizontal"
        label="Amount"
        v-model="amount"
        :errors="errors?.['amount']"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
