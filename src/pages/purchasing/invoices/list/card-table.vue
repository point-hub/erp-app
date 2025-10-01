<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { format } from 'date-fns/format'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseDatepicker from '@/components/base-datepicker.vue'
import { useFormatNumber } from '@/composable/format-number'
import { useAuthStore } from '@/stores/auth.store'

import { useGetWarehousesApi } from './retrieve-all'

const { formatNumber } = useFormatNumber()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getWarehousesApi = useGetWarehousesApi()

interface IPurchaseInvoiceDetail {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  quantity: number
  price: number
  discount: number
  total: number
  notes: string
  allocation: {
    _id: string
    label: string
    code: string
    name: string
  }
}

interface IPurchaseInvoice {
  _id: string
  form_number: string
  required_date: string
  created_date: string
  branch: {
    _id: string
    label: string
    code: string
    name: string
  }
  supplier: {
    _id: string
    label: string
    code: string
    name: string
  }
  details: IPurchaseInvoiceDetail[]
  subtotal: number
  discount: number
  tax_base: number
  tax_type: string
  tax: number
  total: number
  notes: string
  approval_to: {
    _id: string
    label: string
    email: string
    username: string
    name: string
  }
  approval_status: string
  deleted_reason: string
  deleted_by: {
    _id: string
    label: string
    email: string
    username: string
    name: string
  }
  is_deleted: boolean
  is_finished: boolean
}

const searchAll = ref('')
const search = ref({
  branch: '',
  code: '',
  name: '',
  address: '',
  phone: '',
  start_date: '',
  end_date: '',
  approval_status: '',
  form_status: '',
})
const purchaseInvoices = ref<IPurchaseInvoice[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  router.push({
    path: '/purchasing/invoices',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.branch': search.value.branch,
      'search.start_date': search.value.start_date,
      'search.end_date': search.value.end_date,
      'search.approval_status': search.value.approval_status,
      'search.form_status': search.value.form_status
    }
  })
}

watchDebounced(
  searchAll,
  async () => {
    // start loading
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // call api
    const response = await getWarehousesApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    purchaseInvoices.value = response?.data
    pagination.value = response?.pagination
    // update url query params
    updateRouter()
    // finish loading
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

watchDebounced(
  search.value,
  async () => {
    // start loading
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // call api
    const response = await getWarehousesApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    purchaseInvoices.value = response?.data
    pagination.value = response?.pagination
    // update url query params
    updateRouter()
    // finish loading
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

// Section Pagination
const onPageUpdate = async () => {
  // call api
  const response = await getWarehousesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  purchaseInvoices.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  isLoading.value = true
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.branch = route.query['search.branch']?.toString() ?? ''
  search.value.start_date = route.query['search.start_date']?.toString() ?? ''
  search.value.end_date = route.query['search.end_date']?.toString() ?? ''
  search.value.form_status = route.query['search.form_status']?.toString() ?? ''
  search.value.approval_status = route.query['search.approval_status']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getWarehousesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  purchaseInvoices.value = response?.data
  pagination.value = response?.pagination

  isLoading.value = false
})

const options: any[] = [
  { id: 1, label: 'Approved', value: 'approved' },
]

const options2: any[] = [
  { id: 1, label: 'Pending', value: 'pending' },
  { id: 2, label: 'Done', value: 'done' },
  { id: 3, label: 'Deleted', value: 'deleted' },
]
const selectedValue = ref('')
</script>

<template>
  <base-card>
    <template #header>Purchase Invoices</template>

    <div class="my-5 flex justify-end gap-4">
      <div class="flex gap-2">
        <base-datepicker v-model="search.start_date" border="full" placeholder="Start Date" class="h-full" />
        <base-datepicker v-model="search.end_date" border="full" placeholder="End Date" class="h-full" />
        <base-select v-model="search.approval_status" :options="options" v-model:selectedValue="selectedValue"
          border="full" placeholder="Approval Status" />
        <base-select v-model="search.form_status" :options="options2" v-model:selectedValue="selectedValue"
          border="full" placeholder="Form Status" />

      </div>
    </div>
    <div class="flex gap-2">
      <router-link to="/purchasing/invoices/create-1" v-if="authStore.permission?.purchasing?.invoices?.create">
        <base-button color="info" shape="sharp">Create</base-button>
      </router-link>
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <th class="w-30">Form #</th>
            <th class="w-30">Form Date</th>
            <th class="w-30">Time</th>
            <th>Supplier</th>
            <th>Branch</th>
            <th>Item</th>
            <th>Notes</th>
            <th class="text-right">Quantity</th>
            <th class="text-right">Price</th>
            <th class="text-right">Discount</th>
            <th class="text-right">Total</th>
            <th class="text-right">Total Invoice</th>
            <th class="text-center">Approval Status</th>
            <th class="text-center">Form Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="10">
              <div class="table-loader">
                <base-loader />
              </div>
            </td>
          </tr>
          <template v-if="!isLoading">
            <template v-for="purchaseInvoice in purchaseInvoices">
              <tr v-for="(detail, index) in purchaseInvoice.details" :key="index">
                <td></td>
                <td>
                  <router-link :to="`/purchasing/invoices/${purchaseInvoice._id}`" class="text-blue">
                    {{ purchaseInvoice.form_number }}
                  </router-link>
                </td>
                <td>{{ format(new Date(purchaseInvoice.created_date), 'yyyy-MM-dd') }}</td>
                <td>{{ format(new Date(purchaseInvoice.created_date), 'HH:mm') }}</td>
                <td>{{ purchaseInvoice.supplier.label }}</td>
                <td>{{ purchaseInvoice.branch.label }}</td>
                <td>{{ detail.item.label }}</td>
                <td>{{ detail.notes }}</td>
                <td class="text-right">
                  {{ formatNumber(detail.quantity) }} {{ detail.item.unit }}
                </td>
                <td class="text-right">{{ formatNumber(detail.price) }}</td>
                <td class="text-right">{{ formatNumber(detail.discount) }}</td>
                <td class="text-right">{{ formatNumber(detail.total) }}</td>
                <td class="text-right">{{ formatNumber(purchaseInvoice.total) }}</td>
                <td class="text-center">
                  <base-badge :color="purchaseInvoice.approval_status === 'rejected'
                    ? 'danger'
                    : purchaseInvoice.approval_status === 'approved'
                      ? 'success'
                      : 'warning'
                    ">
                    {{ purchaseInvoice.approval_status ?? 'pending' }}
                  </base-badge>
                </td>
                <td class="text-center">
                  <base-badge v-if="purchaseInvoice.is_deleted" color="danger">deleted</base-badge>
                  <base-badge v-else-if="!purchaseInvoice.is_finished" color="warning">pending</base-badge>
                  <base-badge v-else-if="purchaseInvoice.is_finished" color="success">finished</base-badge>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </base-table>
      <base-pagination v-if="!isLoading" v-model="pagination.page" :page-size="pagination.page_size"
        :total-document="pagination.total_document" @update:model-value="onPageUpdate()" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
