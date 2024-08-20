<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import WarehouseAutocomplete from '@/pages/master/warehouses/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'
import { useGetWarehousesApi } from './get-warehouses.api'

const getWarehousesApi = useGetWarehousesApi()

const default_warehouse = defineModel<string>('default_warehouse')
const warehouses = defineModel<string[]>('warehouses', { default: [] })
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref<{ id: string; label: string; checked: boolean }[]>([])

onMounted(async () => {
  const response = await getWarehousesApi.send('')
  if (response?.data) {
    options.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      const index = warehouses.value.findIndex((warehouse) => data._id === warehouse)
      let checked = false
      if (index !== -1) {
        checked = true
      }

      if (default_warehouse.value === data._id) {
        selected.value = {
          id: data._id,
          label: `[${data.code}] ${data.name}`
        }
      }

      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`,
        checked: checked
      }
    })
  }
})

const onChecked = (option: { id: string; label: string; checked: boolean }) => {
  if (option.checked) {
    warehouses.value.push(option.id)
    return
  }

  // if option unchecked remove warehouse id from array
  const index = warehouses.value.findIndex((warehouse) => warehouse === option.id)
  if (index !== -1) {
    warehouses.value.splice(index, 1)

    if (option.id === default_warehouse.value) {
      default_warehouse.value = ''
      selected.value = { id: '', label: '', checked: false }
    }
  }
}

watch(default_warehouse, () => {
  if (!default_warehouse.value) return

  const index = warehouses.value.findIndex((warehouse) => default_warehouse.value === warehouse)
  if (index === -1 && default_warehouse.value) {
    warehouses.value.push(default_warehouse.value)
    for (const option of options.value) {
      if (option.id === default_warehouse.value) {
        option.checked = true
      }
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
                <base-checkbox v-model="option.checked" @change="onChecked(option)" class="-mr-2" />
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
