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

interface IPurchaseRequestDetail {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  quantity: string
  notes: string
  allocation: {
    _id: string
    label: string
    code: string
    name: string
  }
}

interface IPurchaseRequest {
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
  details: IPurchaseRequestDetail[]
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
const purchaseRequests = ref<IPurchaseRequest[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  router.push({
    path: '/purchasing/purchase-requests',
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
    purchaseRequests.value = response?.data
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
    purchaseRequests.value = response?.data
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
  purchaseRequests.value = response?.data
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
  purchaseRequests.value = response?.data
  pagination.value = response?.pagination

  isLoading.value = false
})

const formStatus = (purchaseRequest: IPurchaseRequest) => {
  return 'color'
}
</script>

<template>
  <base-card>
    <template #header>Purchase Requests</template>

    <div class="my-5 flex gap-2">
      <router-link
        to="/purchasing/purchase-requests/create"
        v-if="authStore.permission?.purchasing?.purchase_requests?.create"
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
            <th class="w-30">Form #</th>
            <th class="w-30">Form Date</th>
            <th class="w-30">Time</th>
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
            <template v-for="purchaseRequest in purchaseRequests">
              <tr v-for="(detail, index) in purchaseRequest.details" :key="index">
                <td></td>
                <td>
                  <router-link
                    :to="`/purchasing/purchase-requests/${purchaseRequest._id}`"
                    class="text-blue"
                  >
                    {{ purchaseRequest.form_number }}
                  </router-link>
                </td>
                <td>{{ format(new Date(purchaseRequest.created_date), 'yyyy-MM-dd') }}</td>
                <td>{{ format(new Date(purchaseRequest.created_date), 'HH:mm') }}</td>
                <td>{{ purchaseRequest.required_date }}</td>
                <td>{{ purchaseRequest.branch.label }}</td>
                <td>{{ detail.item.label }}</td>
                <td>{{ detail.notes }}</td>
                <td class="text-right">
                  {{ numberFormat(detail.quantity) }} {{ detail.item.unit }}
                </td>
                <td class="text-center">
                  <div class="flex flex-col">
                    <div>
                      <base-badge
                        :color="
                          purchaseRequest.approval_status === 'rejected'
                            ? 'danger'
                            : purchaseRequest.approval_status === 'approved'
                              ? 'success'
                              : 'warning'
                        "
                      >
                        {{ purchaseRequest.approval_status ?? 'pending' }}
                      </base-badge>
                    </div>
                    <span class="text-xs">{{ purchaseRequest.approval_to.label }}</span>
                  </div>
                </td>
                <td class="text-center">
                  <base-badge v-if="purchaseRequest.is_deleted" color="danger">deleted</base-badge>
                  <base-badge v-else-if="!purchaseRequest.is_finished" color="warning"
                    >open</base-badge
                  >
                  <base-badge v-else-if="purchaseRequest.is_finished" color="success"
                    >finished</base-badge
                  >
                </td>
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
