<script setup lang="ts">
import {
  BaseAutocomplete,
  type BaseAutocompleteOptionInterface,
  BaseBreadcrumb,
  BaseButton,
  BaseCard,
  BaseCheckbox,
  BaseInput,
  BasePagination,
  BaseRadio,
  BaseTable
} from '@point-hub/papp'
import { watchDebounced } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

import { useForm } from './form'
import { useRetrieveAllApi } from './retrieve-all.api'

interface OptionInterface extends BaseAutocompleteOptionInterface {
  id: number
  label: string
}

const typeOptions: OptionInterface[] = [
  { id: 1, label: 'ASSET' },
  { id: 2, label: 'LIABILITY' },
  { id: 3, label: 'EQUITY' },
  { id: 4, label: 'INCOME' },
  { id: 5, label: 'EXPENSE' }
]

const subledgerOptions: OptionInterface[] = [
  { id: 1, label: 'ITEM' },
  { id: 2, label: 'SUPPLIER' },
  { id: 3, label: 'CUSTOMER' }
]

const increaseInOptions = [
  {
    label: 'Debit',
    value: 'debit'
  },
  {
    label: 'Credit',
    value: 'credit'
  }
]

const subledger = ref(subledgerOptions[0])
const type = ref(typeOptions[0])
const increaseIn = ref(increaseInOptions[0])

const form = useForm()
const items = [
  {
    name: 'Accounting'
  },
  {
    name: 'Chart of Account',
    path: '/accounting/chart-of-account'
  },
  {
    name: 'Create'
  }
]

const searchAll = ref('')

watchDebounced(
  searchAll,
  async () => {
    const data = await retrieveAllApi.send({
      page: page.value,
      page_size: 5,
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
    page_size: 5,
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
    <component :is="BaseCard">
      <form @submit.prevent="" class="gap-4 flex flex-col">
        <component
          :is="BaseInput"
          v-model="form.data.value.number"
          required
          label="Account Number"
          layout="vertical"
        />
        <component
          :is="BaseInput"
          required
          v-model="form.data.value.name"
          label="Account Name"
          layout="vertical"
        />
        <component
          label="Account Type"
          :is="BaseAutocomplete"
          v-model="type"
          :options="typeOptions"
        />
        <component
          :is="BaseInput"
          required
          v-model="form.data.value.type"
          label="Account Type"
          layout="vertical"
        />
        <component
          :is="BaseRadio"
          label="Default Value"
          required
          name="radio-option"
          :options="increaseInOptions"
          v-model="increaseIn"
        />
        <component
          label="Subledger"
          :is="BaseAutocomplete"
          v-model="subledger"
          :options="subledgerOptions"
        />
        <div>
          <component type="submit" :is="BaseButton" color="primary">Save</component>
        </div>
      </form>
    </component>
  </div>
</template>

<style scoped lang="postcss"></style>
