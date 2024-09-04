<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import WarehouseAutocomplete, {
  type ISelectedWarehouse
} from '@/pages/master/warehouses/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'
import { useGetWarehousesApi } from './get-warehouses.api'

const getWarehousesApi = useGetWarehousesApi()

const default_warehouse = defineModel<string>('default_warehouse', { default: {} })
const warehouses = defineModel<string[]>('warehouses', { default: [] })
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref<{ id: string; label: string; checked: boolean }[]>([])

onMounted(async () => {
  const response = await getWarehousesApi.send('')
  if (response?.data) {
    options.value = response.data.map((data: ISelectedWarehouse) => {
      const index = warehouses.value.findIndex((warehouse) => data._id === warehouse)
      let checked = false
      if (index !== -1) {
        checked = true
      }

      if (default_warehouse.value === data._id) {
        selected.value = {
          id: data._id,
          label: data.label
        }
      }
      return {
        id: data._id,
        label: data.label,
        checked: checked
      }
    })
  }
})

watch(warehouses, () => {
  for (const option of options.value) {
    const index = warehouses.value.findIndex((warehouse) => option.id === warehouse)
    if (index !== -1) {
      option.checked = true
    }
  }
})
</script>

<template>
  <base-card>
    <template #header>Warehouse</template>

    <div class="flex flex-col gap-4 mt-5">
      <warehouse-autocomplete
        label="Default Warehouse"
        disabled
        v-model="default_warehouse"
        v-model:selected="selected"
        :errors="errors?.default_warehouse"
      />

      <base-table class="max-h-100">
        <thead>
          <tr>
            <th class="w-0">Access</th>
            <th>Warehouses</th>
          </tr>
        </thead>
        <tbody v-if="warehouses">
          <tr v-for="option in options" :key="option.id">
            <td>
              <div class="flex items-center justify-center">
                <base-checkbox disabled v-model="option.checked" class="-mr-2" />
              </div>
            </td>
            <td>{{ option.label }}</td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
