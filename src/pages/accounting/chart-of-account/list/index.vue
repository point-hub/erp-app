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
import { watchDebounced } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

import { useRetrieveAllApi } from './retrieve-all.api'

const items = [
  {
    name: 'Accounting'
  },
  {
    name: 'Chart of Account',
    path: '/accounting/chart-of-account'
  }
]

const searchAll = ref('')
watchDebounced(
  searchAll,
  async () => {
    const data = await retrieveAllApi.send({
      page: page.value,
      filter: {
        name: searchAll.value,
        number: searchAll.value,
        type: searchAll.value,
        subledger: searchAll.value
      },
      sort: 'number'
    })
    chartOfAccounts.value = data.data
  },
  { debounce: 300, maxWait: 1000 }
)

// Table Data
interface ChartOfAccountInterface {
  id: number
  number: string
  name: string
  type: string
  subledger: string
  checked?: boolean
}

const chartOfAccounts = ref<ChartOfAccountInterface[]>([])

// Section Pagination
const page = ref(1)
const pageSize = ref(10)
const totalDocument = ref(100)
const retrieveAllApi = useRetrieveAllApi()

onMounted(async () => {
  const data = await retrieveAllApi.send({
    page: page.value,
    filter: {
      name: searchAll.value,
      number: searchAll.value,
      type: searchAll.value,
      subledger: searchAll.value
    },
    sort: 'number'
  })
  chartOfAccounts.value = data.data
  page.value = data.pagination.page
  pageSize.value = data.pagination.page_size
  totalDocument.value = data.pagination.total_document
})

const updateData = async () => {
  const data = await retrieveAllApi.send({
    page: page.value,
    filter: {
      name: searchAll.value,
      number: searchAll.value,
      type: searchAll.value,
      subledger: searchAll.value
    },
    sort: 'number'
  })
  chartOfAccounts.value = data.data
}

const columns = ref([
  {
    name: 'Checkbox',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Number',
    isShow: true,
    isEditable: false
  },
  {
    name: 'Name',
    isShow: true,
    isEditable: false
  },
  {
    name: 'Type',
    isShow: true,
    isEditable: false
  },
  {
    name: 'Subledger',
    isShow: true,
    isEditable: false
  }
])

// Selecting Table Row
const selectAll = computed({
  get() {
    return isCheckedAll()
  },
  set() {
    if (isCheckedAll()) {
      chartOfAccounts.value.forEach((chartOfAccount) => {
        chartOfAccount.checked = false
      })
    } else {
      chartOfAccounts.value.forEach((chartOfAccount) => {
        chartOfAccount.checked = true
      })
    }
  }
})

const isCheckedAll = () => {
  for (const chartOfAccount of chartOfAccounts.value) {
    if (chartOfAccount.checked === undefined || chartOfAccount.checked === false) {
      return false
    }
  }

  return true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Chart of Account</h1>
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
                <!-- <component :is="BaseCheckbox" v-model="selectAll" /> -->
              </th>
              <th v-if="columns[1].isShow">{{ columns[1].name }}</th>
              <th v-if="columns[2].isShow">{{ columns[2].name }}</th>
              <th v-if="columns[3].isShow">{{ columns[3].name }}</th>
              <th v-if="columns[4].isShow">{{ columns[4].name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(chartOfAccount, index) in chartOfAccounts" :key="index">
              <td v-if="columns[0].isShow">
                <!-- <component :is="BaseCheckbox" v-model="chartOfAccount.checked" /> -->
              </td>
              <td v-if="columns[1].isShow">{{ chartOfAccount.number }}</td>
              <td v-if="columns[2].isShow">{{ chartOfAccount.name }}</td>
              <td v-if="columns[3].isShow">{{ chartOfAccount.type }}</td>
              <td v-if="columns[4].isShow">{{ chartOfAccount.subledger }}</td>
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
