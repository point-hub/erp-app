<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import { useGetSuppliersApi } from './retrieve-all.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const getSuppliersApi = useGetSuppliersApi()

interface ISupplier {
  _id: string
  supplier_group: {
    _id: string
    label: string
    code: string
    name: string
  }
  code: string
  name: string
  address: string
  phone: string
}

const searchAll = ref('')
const search = ref({
  supplier_group: '',
  code: '',
  name: '',
  address: '',
  phone: ''
})
const suppliers = ref<ISupplier[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)
const rowMenuRef = ref()

const updateRouter = () => {
  router.push({
    path: '/master/suppliers',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.supplier_group': search.value.supplier_group,
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
    const response = await getSuppliersApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    suppliers.value = response?.data
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
    const response = await getSuppliersApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    suppliers.value = response?.data
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
  const response = await getSuppliersApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  suppliers.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.supplier_group = route.query['search.supplier_group']?.toString() ?? ''
  search.value.code = route.query['search.code']?.toString() ?? ''
  search.value.name = route.query['search.name']?.toString() ?? ''
  search.value.address = route.query['search.address']?.toString() ?? ''
  search.value.phone = route.query['search.phone']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getSuppliersApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  suppliers.value = response?.data
  pagination.value = response?.pagination
})

const onDeleteModal = (supplier_group: ISupplier, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: supplier_group._id,
    name: `[${supplier_group.code}] ${supplier_group.name}`
  })
}

const onDelete = async () => {
  // call api
  const response = await getSuppliersApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  suppliers.value = response?.data
  pagination.value = response?.pagination
}
</script>

<template>
  <base-card>
    <template #header>Suppliers</template>

    <div class="my-5 flex gap-2">
      <router-link
        to="/master/suppliers/create"
        v-if="authStore.permission?.master?.suppliers?.create"
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
            <th class="w-30">Code</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Supplier Group</th>
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
              <base-input required v-model="search.address" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.phone" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input
                required
                v-model="search.supplier_group"
                placeholder="Search"
                border="none"
              />
            </th>
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
            <tr v-for="(supplier, index) in suppliers" :key="index">
              <td>
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button size="xs" @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-xl" icon="i-ph-dots-three-bold"></base-icon>
                  </base-button>
                  <template #content>
                    <base-card class="py-1! px-2! text-sm">
                      <div class="flex flex-col">
                        <router-link :to="`/master/suppliers/${supplier._id}`">
                          <base-button variant="text" color="info">
                            <div class="flex gap-2 w-full">
                              <base-icon class="text-xl" icon="i-ph-eye"></base-icon>
                              <p>View</p>
                            </div>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-1!"></base-divider>
                        <base-button
                          v-if="authStore.permission?.master?.suppliers?.delete"
                          variant="text"
                          color="danger"
                          @click="onDeleteModal(supplier, index)"
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
                <router-link :to="`/master/suppliers/${supplier._id}`" class="text-blue">
                  {{ supplier.code }}
                </router-link>
              </td>
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.address }}</td>
              <td>{{ supplier.phone }}</td>
              <td>{{ supplier.supplier_group.label }}</td>
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
