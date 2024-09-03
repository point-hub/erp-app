<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import { useGetWarehousesApi } from './retrieve-all'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const getWarehousesApi = useGetWarehousesApi()

interface IFormulaItem {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  quantity: string
}

interface IFormula {
  _id: string
  name: string
  process: {
    _id: string
    label: string
    code: string
    name: string
  }
  approval_to: {
    _id: string
    label: string
    username: string
    name: string
    email: string
  }
  finished_goods: IFormulaItem[]
  raw_materials: IFormulaItem[]
  notes: string
}

const searchAll = ref('')
const search = ref({
  branch: '',
  code: '',
  name: '',
  address: '',
  phone: ''
})
const formulas = ref<IFormula[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)
// const rowMenuRef = ref()

const updateRouter = () => {
  router.push({
    path: '/manufacture/formulas',
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
    formulas.value = response?.data
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
    formulas.value = response?.data
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
  formulas.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
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
  formulas.value = response?.data
  pagination.value = response?.pagination
})

// const onDeleteModal = (formula: IFormula, index: number) => {
//   rowMenuRef.value[index].toggle(false)
//   deleteModalRef.value.toggleModal(true, {
//     id: formula._id,
//     name: `${formula.required_date}`
//   })
// }

const onDelete = async () => {
  // call api
  const response = await getWarehousesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  formulas.value = response?.data
  pagination.value = response?.pagination
}
</script>

<template>
  <base-card>
    <template #header>Formulas</template>

    <div class="my-5 flex gap-2">
      <router-link
        to="/manufacture/formulas/create"
        v-if="authStore.permission?.manufacture?.formulas?.create"
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
            <th class="w-30"></th>
            <th></th>
            <th colspan="2" class="text-center bg-red-100 dark:bg-red-800">Finished Goods</th>
            <th colspan="2" class="text-center bg-green-100 dark:bg-green-800">
              Raw Materials Goods
            </th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th>Form</th>
            <th>Notes</th>
            <th class="text-left bg-red-100 dark:bg-red-800">Name</th>
            <th class="text-right bg-red-100 dark:bg-red-800">Quantity</th>
            <th class="text-left bg-green-100 dark:bg-green-800">Name</th>
            <th class="text-right bg-green-100 dark:bg-green-800">Quantity</th>
            <th>Approval Status</th>
          </tr>
          <!-- <tr class="bg-slate-50 dark:bg-slate-700">
            <th></th>
            <th class="basic-table-head">
              <base-input required v-model="search.code" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.name" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.branch" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.address" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.phone" placeholder="Search" border="none" />
            </th>
          </tr> -->
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="5">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-spinner color="primary" size="xs" /> <span>Loading</span>
              </p>
            </td>
          </tr>
          <template v-if="!isLoading">
            <template v-for="formula in formulas">
              <tr v-for="(item, index) in formula.raw_materials" :key="index">
                <td></td>
                <td>
                  <router-link :to="`/manufacture/formulas/${formula._id}`" class="text-blue">
                    {{ formula.name }}
                  </router-link>
                </td>
                <td>{{ formula.notes }}</td>
                <td class="text-left bg-red-100 dark:bg-red-800">
                  {{ formula.finished_goods[0].item.label }}
                </td>
                <td class="text-left bg-red-100 dark:bg-red-800">
                  {{ formula.finished_goods[0].quantity }} {{ formula.finished_goods[0].item.unit }}
                </td>
                <td class="text-left bg-green-100 dark:bg-green-800">{{ item.item.label }}</td>
                <td class="text-left bg-green-100 dark:bg-green-800">
                  {{ item.quantity }} {{ item.item.unit }}
                </td>
                <td><base-badge color="warning">pending</base-badge></td>
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
    <delete-modal ref="deleteModalRef" @deleted="onDelete" />
  </base-card>
</template>

<style scoped lang="postcss"></style>
