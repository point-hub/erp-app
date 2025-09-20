<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { format } from 'date-fns/format'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useFormatNumber } from '@/composable/format-number'
import { useAuthStore } from '@/stores/auth.store'

import { useGetWarehousesApi } from './retrieve-all'

const { formatNumber } = useFormatNumber()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getWarehousesApi = useGetWarehousesApi()

interface IReceiveOrderDetail {
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
  allocation: {
    _id: string
    label: string
    code: string
    name: string
  }
}

interface IReceiveOrder {
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
  warehouse: {
    _id: string
    label: string
    code: string
    name: string
  }
  details: IReceiveOrderDetail[]
  driver: string
  license_plate: string
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
  phone: ''
})
const receiveOrders = ref<IReceiveOrder[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  router.push({
    path: '/purchasing/receive-orders',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.branch': search.value.branch,
      'search.code': search.value.code,
      'search.name': search.value.name,
      'search.address': search.value.address,
      'search.phone': search.value.phone
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
    receiveOrders.value = response?.data
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
    receiveOrders.value = response?.data
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
  receiveOrders.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  isLoading.value = true
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.branch = route.query['search.branch']?.toString() ?? ''
  search.value.code = route.query['search.code']?.toString() ?? ''
  search.value.name = route.query['search.name']?.toString() ?? ''
  search.value.address = route.query['search.address']?.toString() ?? ''
  search.value.phone = route.query['search.phone']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getWarehousesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  receiveOrders.value = response?.data
  pagination.value = response?.pagination

  isLoading.value = false
})
</script>

<template>
  <base-card>
    <template #header>Receive Orders</template>

    <div class="my-5 flex gap-2">
      <router-link to="/purchasing/receive-orders/create"
        v-if="authStore.permission?.purchasing?.receive_orders?.create">
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
            <th class="w-40">Required Date</th>
            <th>Branch</th>
            <th>Driver</th>
            <th>License Plate</th>
            <th>Item</th>
            <th class="text-right">Quantity</th>
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
            <template v-for="receiveOrder in receiveOrders">
              <tr v-for="(detail, index) in receiveOrder.details" :key="index">
                <td></td>
                <td>
                  <router-link :to="`/purchasing/receive-orders/${receiveOrder._id}`" class="text-blue">
                    {{ receiveOrder.form_number }}
                  </router-link>
                </td>
                <td>{{ format(new Date(receiveOrder.created_date), 'yyyy-MM-dd') }}</td>
                <td>{{ format(new Date(receiveOrder.created_date), 'HH:mm') }}</td>
                <td>{{ receiveOrder.required_date }}</td>
                <td>{{ receiveOrder.branch.label }}</td>
                <td>{{ receiveOrder.driver }}</td>
                <td>{{ receiveOrder.license_plate }}</td>
                <td>{{ detail.item.label }}</td>
                <td class="text-right">
                  {{ formatNumber(detail.quantity) }} {{ detail.item.unit }}
                </td>
                <td class="text-center">
                  <base-badge v-if="receiveOrder.is_deleted" color="danger">deleted</base-badge>
                  <base-badge v-else-if="!receiveOrder.has_invoice" color="warning">pending</base-badge>
                  <base-badge v-else-if="receiveOrder.has_invoice" color="success">finished</base-badge>
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
