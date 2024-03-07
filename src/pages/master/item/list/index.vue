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

const breadcrumbs = [
  {
    name: 'Master'
  },
  {
    name: 'Item',
    path: '/master/item'
  }
]

const searchAll = ref('')

// Table Data
interface ItemInterface {
  id: number
  name: string
  code: string
  account: string
  category: string
  checked?: boolean
}

const items = ref<ItemInterface[]>([
  {
    id: 1,
    code: 'IT0001',
    name: 'Kopibara 70gr',
    account: '10404 - Persediaan Barang Jadi',
    category: 'Kopi'
  },
  {
    id: 2,
    code: 'IT0002',
    name: 'Kopibara 100gr',
    account: '10404 - Persediaan Barang Jadi',
    category: 'Kopi'
  },
  {
    id: 1,
    code: 'IT0003',
    name: 'Kopibara Yes',
    account: '10404 - Persediaan Barang Jadi',
    category: 'Kopi'
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
    name: 'Account',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Category',
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
      items.value.forEach((item) => {
        item.checked = false
      })
    } else {
      items.value.forEach((item) => {
        item.checked = true
      })
    }
  }
})

const isCheckedAll = () => {
  for (const item of items.value) {
    if (item.checked === undefined || item.checked === false) {
      return false
    }
  }

  return true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Item</h1>
    <component :is="BaseBreadcrumb" :items="breadcrumbs" separator="angle" v-slot="{ item }">
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
              <th v-if="columns[4].isShow">{{ columns[4].name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td v-if="columns[0].isShow">
                <component :is="BaseCheckbox" v-model="item.checked" />
              </td>
              <td v-if="columns[1].isShow">{{ item.code }}</td>
              <td v-if="columns[2].isShow">{{ item.name }}</td>
              <td v-if="columns[3].isShow">{{ item.account }}</td>
              <td v-if="columns[4].isShow">{{ item.category }}</td>
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
