<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { format, formatDate } from 'date-fns/format'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useFormatNumber } from '@/composable/format-number'
import { useAuthStore } from '@/stores/auth.store'
import { useCheckedStore } from "@/stores/invoice.store"

import { useGetWarehousesApi } from './retrieve-all'

const checkedStore = useCheckedStore()
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
  phone: '',
  supplier: ''
})
const receiveOrders = ref<IReceiveOrder[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  // router.push({
  //   path: '/purchasing/invoices/create-2/' + route.params.id,
  //   query: {
  //     search: searchAll.value,
  //     page: pagination.value.page,
  //     'search.branch': search.value.branch,
  //     'search.code': search.value.code,
  //     'search.name': search.value.name,
  //     'search.address': search.value.address,
  //     'search.phone': search.value.phone
  //   }
  // })
}

// watchDebounced(
//   searchAll,
//   async () => {
//     // start loading
//     isLoading.value = true
//     // reset page 1
//     pagination.value.page = 1
//     // call api
//     const response = await getWarehousesApi.send(
//       { all: searchAll.value, ...search.value },
//       pagination.value.page
//     )
//     receiveOrders.value = response?.data
//     pagination.value = response?.pagination
//     // update url query params
//     updateRouter()
//     // finish loading
//     isLoading.value = false
//   },
//   { debounce: 500, maxWait: 1000 }
// )

// watchDebounced(
//   search.value,
//   async () => {
//     // start loading
//     isLoading.value = true
//     // reset page 1
//     pagination.value.page = 1
//     // call api
//     const response = await getWarehousesApi.send(
//       { all: searchAll.value, ...search.value },
//       pagination.value.page
//     )
//     receiveOrders.value = response?.data
//     pagination.value = response?.pagination
//     // update url query params
//     updateRouter()
//     // finish loading
//     isLoading.value = false
//   },
//   { debounce: 500, maxWait: 1000 }
// )

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
  search.value.supplier = route.params.id.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getWarehousesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  // receiveOrders.value = response?.data

  // Group by supplier
  const grouped = response?.data.reduce((acc, item) => {
    const supplierId = item.supplier._id;

    if (!acc[supplierId]) {
      acc[supplierId] = {
        supplier: item.supplier,
        forms: []
      };
    }

    acc[supplierId].forms.push(item);
    return acc;
  }, {});


  receiveOrders.value = Object.values(grouped);
  pagination.value = response?.pagination

  isLoading.value = false
})

const onCheck = (item) => {
  checkedStore.toggleItem(item)
}
</script>

<template>
  <base-card>
    <template #header>Create Invoice Step-2</template>

    <div class="my-5 flex gap-2">
      <!-- <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" /> -->
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <th class="w-30">Date</th>
            <th class="w-30">Form Number</th>
            <th class="w-30">Purchase Received</th>
            <th class="w-30">Warehouse</th>
            <th class="w-30">Items</th>
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
            <template v-for="receiveOrder in receiveOrders" :key="receiveOrder">
              <tr v-for="form in receiveOrder.forms" :key="form">
                <td class="w-1">
                  <base-checkbox @change="onCheck(form)" />
                </td>
                <td>
                  {{ formatDate(form.created_date, 'yyyy-MM-dd') }}
                </td>
                <td>
                  {{ form.form_number }}
                </td>
                <td>
                  {{ form.supplier.label }}
                </td>
                <td>
                  {{ form.warehouse.label }}
                </td>
                <td>
                  {{form.details.map(f => f.item.label).join(", ")}}
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </base-table>
      <router-link :to="`/purchasing/invoices/create`">
        <base-button color="primary">Next</base-button>
      </router-link>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
