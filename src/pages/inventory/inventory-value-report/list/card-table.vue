<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import { useGetMachinesApi } from './get-machines.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getMachinesApi = useGetMachinesApi()

interface IMachine {
  _id: string
  code: string
  name: string
  notes: string
}

const searchAll = ref('')
const search = ref({
  item: '',
  unit: '',
  warehouse: '',
  date_start: '',
  date_end: ''
})
const machines = ref<IMachine[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  router.push({
    path: '/inventory/inventory-value-report',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.item': search.value.item,
      'search.unit': search.value.unit
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
    const response = await getMachinesApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    machines.value = response?.data
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
    const response = await getMachinesApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    machines.value = response?.data
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
  const response = await getMachinesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  machines.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.item = route.query['search.item']?.toString() ?? ''
  search.value.unit = route.query['search.unit']?.toString() ?? ''
  search.value.warehouse = route.query['search.warehouse']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getMachinesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  machines.value = response?.data
  pagination.value = response?.pagination
})
</script>

<template>
  <base-card>
    <template #header>Inventory Report</template>

    <div class="my-5 flex gap-2">
      <router-link
        to="/inventory/inventory-report/create"
        v-if="authStore.permission?.inventory?.inventory_report?.create"
      >
        <base-button color="info" shape="sharp">Create</base-button>
      </router-link>
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-30"></th>
            <th class="w-30"></th>
            <th></th>
            <th colspan="2">Opening Stock</th>
            <th colspan="2">In</th>
            <th colspan="2">Out</th>
            <th colspan="2">Closing Stock</th>
          </tr>
          <tr class="bg-slate-50 dark:bg-slate-700">
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head" colspan="2">
              <base-datepicker v-model="search.date_start" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head" colspan="2">
              <base-datepicker v-model="search.date_end" placeholder="Search" border="none" />
            </th>
          </tr>
          <tr>
            <th class="w-30">Item</th>
            <th class="w-30">Unit</th>
            <th>Warehouse</th>
            <th>Qty</th>
            <th>Value</th>
            <th>Qty</th>
            <th>Value</th>
            <th>Qty</th>
            <th>Value</th>
            <th>Qty</th>
            <th>Value</th>
          </tr>
          <tr class="bg-slate-50 dark:bg-slate-700">
            <th class="basic-table-head">
              <base-input v-model="search.item" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input v-model="search.unit" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input v-model="search.warehouse" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="11">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-spinner color="primary" size="xs" /> <span>Loading</span>
              </p>
            </td>
          </tr>
          <template v-if="!isLoading">
            <tr v-for="(machine, index) in machines" :key="index">
              <td></td>
              <td>
                <router-link :to="`/inventory/inventory-report/${machine._id}`" class="text-blue">
                  {{ machine.code }}
                </router-link>
              </td>
              <td>
                <router-link :to="`/inventory/inventory-report/${machine._id}`" class="text-blue">
                  {{ machine.name }}
                </router-link>
              </td>
            </tr>
          </template>
        </tbody>
      </base-table>
      <!-- <base-pagination
        v-if="!isLoading"
        v-model="pagination.page"
        :page-size="pagination.page_size"
        :total-document="pagination.total_document"
        @update:model-value="onPageUpdate()"
      /> -->
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
