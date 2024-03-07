<script setup lang="ts">
import {
  BaseBreadcrumb,
  BaseButton,
  BaseCard,
  BaseCheckbox,
  BaseInput,
  BasePagination,
  BaseTable
} from '@point-hub/papp'
import { computed, ref } from 'vue'

const items = [
  {
    name: 'Master'
  },
  {
    name: 'Warehouse',
    path: '/master/warehouse'
  }
]

const searchAll = ref('')

// Table Data
interface WarehouseInterface {
  id: number
  name: string
  code: string
  branch: string
  checked?: boolean
}

const warehouses = ref<WarehouseInterface[]>([
  {
    id: 1,
    code: 'WH0001',
    name: 'Central',
    branch: 'Main'
  },
  {
    id: 2,
    code: 'WH0002',
    name: 'Jakarta',
    branch: 'Main'
  },
  {
    id: 3,
    code: 'WH0003',
    name: 'Surabaya',
    branch: 'Main'
  }
])

// Section Pagination
const page = ref(1)
const pageSize = ref(1)
const totalDocument = ref(1)

const updateData = () => {}

const columns = ref([
  {
    name: 'Checkbox',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Code',
    isShow: true,
    isEditable: false
  },
  {
    name: 'Name',
    isShow: true,
    isEditable: false
  },
  {
    name: 'Branch',
    isShow: true,
    isEditable: true
  }
])

// Selecting Table Row
const selectAll = computed({
  get() {
    return isCheckedAll()
  },
  set() {
    if (isCheckedAll()) {
      warehouses.value.forEach((warehouse) => {
        warehouse.checked = false
      })
    } else {
      warehouses.value.forEach((warehouse) => {
        warehouse.checked = true
      })
    }
  }
})

const isCheckedAll = () => {
  for (const warehouse of warehouses.value) {
    if (warehouse.checked === undefined || warehouse.checked === false) {
      return false
    }
  }

  return true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Warehouse</h1>
    <component :is="BaseBreadcrumb" :items="items" separator="angle" v-slot="{ item }">
      <router-link v-if="item.path" :class="{ 'breadcrumb-link': item.path }" :to="item.path">
        {{ item.name }}
      </router-link>
      <span v-else>{{ item.name }}</span>
    </component>
    <component :is="BaseCard" header="s">
      <div class="flex flex-col gap-4">
        <div class="w-full flex items-center gap-4">
          <div class="w-full flex gap-2">
            <component :is="BaseButton" color="primary" border="none" shape="sharp" class="gap-1">
              <base-icon icon="i-far-pen-to-square" />
              <span>Add</span>
            </component>
            <component
              :is="BaseInput"
              v-model="searchAll"
              placeholder="Search"
              border="full"
              class="flex-1"
            >
              <template #prefix>
                <base-icon icon="i-far-magnifying-glass" class="mx-3" />
              </template>
            </component>
          </div>
        </div>
        <component :is="BaseTable">
          <thead>
            <tr>
              <th v-if="columns[0].isShow" class="w-1">
                <component :is="BaseCheckbox" v-model="selectAll" />
              </th>
              <th v-if="columns[1].isShow">{{ columns[1].name }}</th>
              <th v-if="columns[2].isShow">{{ columns[2].name }}</th>
              <th v-if="columns[3].isShow">{{ columns[3].name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(warehouse, index) in warehouses" :key="index">
              <td v-if="columns[0].isShow">
                <component :is="BaseCheckbox" v-model="warehouse.checked" />
              </td>
              <td v-if="columns[1].isShow">{{ warehouse.code }}</td>
              <td v-if="columns[2].isShow">{{ warehouse.name }}</td>
              <td v-if="columns[3].isShow">{{ warehouse.branch }}</td>
            </tr>
          </tbody>
        </component>
        <component
          :is="BasePagination"
          v-model="page"
          :page-size="pageSize"
          :totalDocument="totalDocument"
          @update:model-value="updateData()"
        />
      </div>
    </component>
  </div>
</template>

<style scoped lang="postcss"></style>
