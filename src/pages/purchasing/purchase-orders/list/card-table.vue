<script setup lang="ts">
import { numberFormat } from '@point-hub/js-utils'
import { watchDebounced } from '@vueuse/core'
import { format } from 'date-fns/format'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import { useGetWarehousesApi } from './retrieve-all'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getWarehousesApi = useGetWarehousesApi()

interface IPurchaseOrderDetail {
  item: {
    _id: string
    code: string
    name: string
    unit: string
  }
  quantity: string
  notes: string
  allocation: {
    _id: string
    code: string
    name: string
  }
}

interface IPurchaseOrder {
  _id: string
  form_number: string
  required_date: string
  created_date: string
  branch: {
    _id: string
    code: string
    name: string
  }
  details: IPurchaseOrderDetail[]
  notes: string
  approval_to: {
    _id: string
    email: string
    username: string
    name: string
  }
  approval_status: string
}

const searchAll = ref('')
const search = ref({
  branch: '',
  code: '',
  name: '',
  address: '',
  phone: ''
})
const purchaseOrders = ref<IPurchaseOrder[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  router.push({
    path: '/purchasing/purchase-orders',
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
    purchaseOrders.value = response?.data
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
    purchaseOrders.value = response?.data
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
  purchaseOrders.value = response?.data
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
  purchaseOrders.value = response?.data
  pagination.value = response?.pagination

  isLoading.value = false
})
</script>

<template>
  <base-card>
    <template #header>Purchase Orders</template>

    <div class="my-5 flex gap-2">
      <router-link
        to="/purchasing/purchase-orders/create"
        v-if="authStore.permission?.purchasing?.purchase_orders?.create"
      >
        <base-button color="info" shape="sharp">Create</base-button>
      </router-link>
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <th class="w-30">Form</th>
            <th class="w-30">Date</th>
            <th class="w-40">Required Date</th>
            <th>Branch</th>
            <th>Item</th>
            <th>Notes</th>
            <th class="text-right">Quantity</th>
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
            <template v-for="purchaseOrder in purchaseOrders">
              <tr v-for="(detail, index) in purchaseOrder.details" :key="index">
                <td></td>
                <td>
                  <router-link
                    :to="`/purchasing/purchase-orders/${purchaseOrder._id}`"
                    class="text-blue"
                  >
                    {{ purchaseOrder.form_number }}
                  </router-link>
                </td>
                <td>{{ format(new Date(purchaseOrder.created_date), 'yyyy-MM-dd HH:mm:ss') }}</td>
                <td>{{ purchaseOrder.required_date }}</td>
                <td>[{{ purchaseOrder.branch.code }}] {{ purchaseOrder.branch.name }}</td>
                <td>[{{ detail.item.code }}] {{ detail.item.name }}</td>
                <td>{{ detail.notes }}</td>
                <td class="text-right">
                  {{ numberFormat(detail.quantity) }} {{ detail.item.unit }}
                </td>
                <td class="text-center">
                  <base-badge
                    :color="
                      purchaseOrder.approval_status === 'rejected'
                        ? 'danger'
                        : purchaseOrder.approval_status === 'approved'
                          ? 'success'
                          : 'warning'
                    "
                  >
                    {{ purchaseOrder.approval_status ?? 'pending' }}
                  </base-badge>
                </td>
                <td class="text-center"><base-badge color="warning">open</base-badge></td>
              </tr>
            </template>
          </template>
        </tbody>
      </base-table>
      <base-pagination
        v-if="!isLoading"
        v-model="pagination.page"
        :page-size="pagination.page_size"
        :total-document="pagination.total_document"
        @update:model-value="onPageUpdate()"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
