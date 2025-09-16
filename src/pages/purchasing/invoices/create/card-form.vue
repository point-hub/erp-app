<script setup lang="ts">
import { watch } from 'vue'

import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import { type ISelectedSupplier } from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'
import PurchaseOrderAutocomplete, {
  type ISelectedPurchaseOrder
} from '@/pages/purchasing/purchase-orders/components/autocomplete/autocomplete.vue'
import { useCheckedStore } from "@/stores/invoice.store"

import type { IFormError } from './form'

const checkedStore = useCheckedStore()
const required_date = defineModel<string>('required_date')
const due_date = defineModel<string>('due_date')
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
      <base-input disabled required layout="horizontal" label="Branch" :modelValue="branch?.label" />

      <base-input required disabled layout="horizontal" label="Supplier"
        :modelValue="checkedStore.$state.items[0]?.supplier?.label" />

      <base-datepicker required v-model="due_date" layout="horizontal" label="Due Date" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
