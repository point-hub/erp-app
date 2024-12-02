<script setup lang="ts">
import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import WarehouseAutocomplete, {
  type ISelectedWarehouse
} from '@/pages/master/warehouses/components/autocomplete/autocomplete.vue'
import PurchaseOrderAutocomplete, {
  type ISelectedPurchaseOrder
} from '@/pages/purchasing/purchase-orders/components/autocomplete/autocomplete.vue'

import type { ISupplier } from '../interface'
import type { IFormError } from './form'

const driver = defineModel<string>('driver')
const license_plate = defineModel<string>('license_plate')
const branch = defineModel<ISelectedBranch>('branch')
const warehouse = defineModel<ISelectedWarehouse>('warehouse')
const warehouse_options = defineModel<ISelectedWarehouse[]>('warehouse_options')
const supplier = defineModel<ISupplier>('supplier')
const required_date = defineModel<string>('required_date')
const purchase_order = defineModel<ISelectedPurchaseOrder>('purchase_order')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Receive Orders</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input
        disabled
        required
        layout="horizontal"
        label="Branch"
        :modelValue="branch?.label"
      />

      <warehouse-autocomplete
        required
        layout="horizontal"
        label="Warehouse"
        v-model:options="warehouse_options"
        v-model:selected="warehouse"
        :errors="errors?.['warehouse._id']"
      />

      <purchase-order-autocomplete
        required
        :required_down_payment="false"
        layout="horizontal"
        label="Purchase Order"
        v-model:selected="purchase_order"
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

      <base-input
        v-if="required_date"
        required
        disabled
        layout="horizontal"
        label="Required Date"
        v-model="required_date"
        :errors="errors?.['required_date']"
      />

      <base-input
        v-if="purchase_order"
        layout="horizontal"
        label="Driver"
        v-model="driver"
        :errors="errors?.['driver']"
      />

      <base-input
        v-if="purchase_order"
        layout="horizontal"
        label="License Plate"
        v-model="license_plate"
        :errors="errors?.['license_plate']"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
