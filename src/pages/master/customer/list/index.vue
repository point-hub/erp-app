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
    name: 'Customer',
    path: '/master/customer'
  }
]

const searchAll = ref('')

// Table Data
interface CustomerInterface {
  id: number
  name: string
  code: string
  address: string
  phone: string
  email: string
  checked?: boolean
}

const customers = ref<CustomerInterface[]>([
  {
    id: 1,
    code: 'CS0001',
    name: 'Alvin',
    address: '',
    phone: '',
    email: ''
  },
  {
    id: 2,
    code: 'CS0002',
    name: 'Jane',
    address: '',
    phone: '',
    email: ''
  },
  {
    id: 1,
    code: 'CS0003',
    name: 'John Doe',
    address: '',
    phone: '',
    email: ''
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
    name: 'Address',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Phone',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Email',
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
      customers.value.forEach((customer) => {
        customer.checked = false
      })
    } else {
      customers.value.forEach((customer) => {
        customer.checked = true
      })
    }
  }
})

const isCheckedAll = () => {
  for (const customer of customers.value) {
    if (customer.checked === undefined || customer.checked === false) {
      return false
    }
  }

  return true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Customer</h1>
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
              <th v-if="columns[4].isShow">{{ columns[4].name }}</th>
              <th v-if="columns[5].isShow">{{ columns[5].name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="index">
              <td v-if="columns[0].isShow">
                <component :is="BaseCheckbox" v-model="customer.checked" />
              </td>
              <td v-if="columns[1].isShow">{{ customer.code }}</td>
              <td v-if="columns[2].isShow">{{ customer.name }}</td>
              <td v-if="columns[3].isShow">{{ customer.address }}</td>
              <td v-if="columns[4].isShow">{{ customer.phone }}</td>
              <td v-if="columns[5].isShow">{{ customer.email }}</td>
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
