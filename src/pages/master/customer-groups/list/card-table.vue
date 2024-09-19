<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import { useGetCustomerGroupsApi } from './retrieve-all.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const getCustomerGroupsApi = useGetCustomerGroupsApi()

interface ICustomerGroup {
  _id: string
  code: string
  name: string
}

const searchAll = ref('')
const search = ref({
  code: '',
  name: ''
})
const customerGroups = ref<ICustomerGroup[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)
const rowMenuRef = ref()

const updateRouter = () => {
  router.push({
    path: '/master/customer-groups',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.code': search.value.code,
      'search.name': search.value.name
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
    const response = await getCustomerGroupsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    customerGroups.value = response?.data
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
    const response = await getCustomerGroupsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    customerGroups.value = response?.data
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
  const response = await getCustomerGroupsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  customerGroups.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.code = route.query['search.code']?.toString() ?? ''
  search.value.name = route.query['search.name']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getCustomerGroupsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  customerGroups.value = response?.data
  pagination.value = response?.pagination
})

const onDeleteModal = (customerGroup: ICustomerGroup, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: customerGroup._id,
    name: `[${customerGroup.code}] ${customerGroup.name}`
  })
}

const onDelete = async () => {
  // call api
  const response = await getCustomerGroupsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  customerGroups.value = response?.data
  pagination.value = response?.pagination
}
</script>

<template>
  <base-card>
    <template #header>Customer Groups</template>

    <div class="my-5 flex gap-2">
      <router-link
        to="/master/customer-groups/create"
        v-if="authStore.permission?.master?.customers?.create"
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
          </tr>
          <tr class="bg-slate-50 dark:bg-slate-700">
            <th></th>
            <th class="basic-table-head">
              <base-input required v-model="search.code" placeholder="Search" border="none" />
            </th>
            <th class="basic-table-head">
              <base-input required v-model="search.name" placeholder="Search" border="none" />
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
            <tr v-for="(customerGroup, index) in customerGroups" :key="index">
              <td>
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button size="xs" @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-xl" icon="i-ph-dots-three-bold"></base-icon>
                  </base-button>
                  <template #content>
                    <base-card class="py-1! px-2! text-sm">
                      <div class="flex flex-col">
                        <router-link :to="`/master/customer-groups/${customerGroup._id}`">
                          <base-button variant="text" color="info">
                            <div class="flex gap-2 w-full">
                              <base-icon class="text-xl" icon="i-ph-eye"></base-icon>
                              <p>View</p>
                            </div>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-1!"></base-divider>
                        <base-button
                          v-if="authStore.permission?.master?.customers?.delete"
                          variant="text"
                          color="danger"
                          @click="onDeleteModal(customerGroup, index)"
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
                <router-link :to="`/master/customer-groups/${customerGroup._id}`" class="text-blue">
                  {{ customerGroup.code }}
                </router-link>
              </td>
              <td>
                <router-link :to="`/master/customer-groups/${customerGroup._id}`" class="text-blue">
                  {{ customerGroup.name }}
                </router-link>
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
