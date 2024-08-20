<script setup lang="ts">
import { onMounted } from 'vue'

import AllocationAutocomplete from '@/pages/master/allocations/components/autocomplete/autocomplete.vue'
import ItemAutocomplete from '@/pages/master/items/components/autocomplete/autocomplete.vue'

interface IItem {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  notes: string
  quantity: number
  price: number
  allocation: {
    _id: string
    label: string
    code: string
    name: string
  }
}

const items = defineModel<IItem[]>('items', { default: [] })

const addMore = () => {
  items.value.push({
    item: {
      _id: '',
      label: '',
      code: '',
      name: '',
      unit: ''
    },
    notes: '',
    quantity: 0,
    allocation: {
      _id: '',
      label: '',
      code: '',
      name: ''
    }
  })
}

const clearAll = () => {
  items.value = []
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}

onMounted(() => {
  clearAll()
  addMore()
})
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th class="min-w-80">Item</th>
            <th class="">Notes</th>
            <th class="">Quantity</th>
            <th class="">Price</th>
            <th class="">Allocation</th>
            <th class=""></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              <span>{{ index + 1 }}</span>
            </td>
            <td><item-autocomplete label="" border="full" v-model:selected="item.item" /></td>
            <td><base-input border="full" v-model="item.notes" /></td>
            <td><base-input-number border="full" v-model="item.quantity" /></td>
            <td><base-input-number border="full" v-model="item.price" /></td>
            <td>
              <allocation-autocomplete
                label=""
                border="full"
                v-model="item.allocation._id"
                v-model:selected="item.allocation"
              />
            </td>
            <td>
              <base-button class="px-1!" @click="removeItem(index)">
                <base-icon icon="i-far-trash"></base-icon>
              </base-button>
            </td>
          </tr>
        </tbody>
      </base-table>
      <div class="flex gap-2">
        <base-button @click="addMore" shape="sharp" color="primary" size="xs">Add More</base-button>
        <base-button @click="clearAll" shape="sharp" color="danger" size="xs">
          Clear All
        </base-button>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
