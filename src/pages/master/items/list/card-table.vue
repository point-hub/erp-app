<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import { useGetItemsApi } from './retrieve-all.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const getItemsApi = useGetItemsApi()

interface IItem {
  _id: string
  label: string
  category: {
    _id: string
    code: string
    name: string
  }
  chart_of_account: {
    _id: string
    number: string
    name: string
  }
  code: string
  name: string
  unit: string
  have_production_number: boolean
  have_an_expiry_date: boolean
}

const searchAll = ref('')
const search = ref({
  label: '',
  category: '',
  chart_of_account: '',
  code: '',
  name: '',
  unit: '',
  have_production_number: null,
  have_an_expiry_date: null
})
const items = ref<IItem[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)
const rowMenuRef = ref()

const updateRouter = () => {
  router.push({
    path: '/master/items',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.chart_of_account': search.value.chart_of_account,
      'search.category': search.value.category,
      'search.code': search.value.code,
      'search.name': search.value.name,
      'search.unit': search.value.unit,
      'search.have_production_number': search.value.have_production_number,
      'search.have_an_expiry_date': search.value.have_an_expiry_date
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
    const response = await getItemsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    items.value = response?.data
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
    const response = await getItemsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    items.value = response?.data
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
  const response = await getItemsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  items.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.chart_of_account = route.query['search.chart_of_account']?.toString() ?? ''
  search.value.category = route.query['search.category']?.toString() ?? ''
  search.value.code = route.query['search.code']?.toString() ?? ''
  search.value.name = route.query['search.name']?.toString() ?? ''
  search.value.unit = route.query['search.unit']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getItemsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  items.value = response?.data
  pagination.value = response?.pagination
})

const onDeleteModal = (category: IItem, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: category._id,
    name: `[${category.code}] ${category.name}`
  })
}

const onDelete = async () => {
  // call api
  const response = await getItemsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  items.value = response?.data
  pagination.value = response?.pagination
}
</script>

<template>
  <base-card>
    <template #header>Items</template>

    <div class="my-5 flex gap-2">
      <router-link to="/master/items/create" v-if="authStore.permission?.master?.items?.create">
        <base-button color="info" shape="sharp">Create</base-button>
      </router-link>
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <th class="w-30">Code</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Category</th>
            <th>Chart of Account</th>
            <th>
              <div class="flex justify-center items-center gap-1">
                <span>DNA</span><base-icon icon="i-far-barcode-read" />
              </div>
            </th>
            <th>
              <div class="flex justify-center items-center gap-1">
                <span>DNA</span><base-icon icon="i-far-alarm-clock" />
              </div>
            </th>
          </tr>
          <tr class="bg-slate-50 dark:bg-slate-700">
            <th></th>
            <th class="basic-table-head">
              <base-input required v-model="search.code" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.name" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.unit" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.category" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input
                required
                v-model="search.chart_of_account"
                placeholder="Search"
                border="none"
              />
            </th>
            <th class="basic-table-head"></th>
            <th class="basic-table-head"></th>
          </tr>
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
            <tr v-for="(item, index) in items" :key="index">
              <td>
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button size="xs" @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-xl" icon="i-ph-dots-three-bold"></base-icon>
                  </base-button>
                  <template #content>
                    <base-card class="py-1! px-2! text-sm">
                      <div class="flex flex-col">
                        <router-link :to="`/master/items/${item._id}`">
                          <base-button variant="text" color="info">
                            <div class="flex gap-2 w-full">
                              <base-icon class="text-xl" icon="i-ph-pencil"></base-icon>
                              <p>Manage</p>
                            </div>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-1!"></base-divider>
                        <base-button
                          v-if="authStore.permission?.master?.items?.delete"
                          variant="text"
                          color="danger"
                          @click="onDeleteModal(item, index)"
                        >
                          <div class="flex gap-2 w-full">
                            <base-icon class="text-xl" icon="i-ph-trash"></base-icon>
                            <p>Delete</p>
                          </div>
                        </base-button>
                      </div>
                    </base-card>
                  </template>
                </base-popover>
              </td>
              <td>
                <router-link :to="`/master/items/${item._id}`" class="text-blue">
                  {{ item.code }}
                </router-link>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.unit }}</td>
              <td>[{{ item.category.code }}] {{ item.category.name }}</td>
              <td>[{{ item.chart_of_account.number }}] {{ item.chart_of_account.name }}</td>
              <td>
                <div class="flex justify-center">
                  <base-icon icon="i-far-circle-check" v-if="item.have_production_number" />
                </div>
              </td>
              <td>
                <div class="flex justify-center">
                  <base-icon icon="i-far-circle-check" v-if="item.have_an_expiry_date" />
                </div>
              </td>
            </tr>
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
