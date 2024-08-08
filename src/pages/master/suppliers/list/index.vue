<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'

import DeleteModal from '../components/delete-modal.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()

interface ISupplier {
  _id: string
  supplier_group: {
    code: string
    name: string
  }
  code: string
  name: string
}
const searchAll = ref('')
const search = ref({
  supplier_group: '',
  code: '',
  name: ''
})
const isLoading = ref(false)

watchDebounced(
  searchAll,
  async () => {
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // update url query params
    router.push({
      path: '/master/suppliers',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
    // call api
    await getSuppliers()
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

watchDebounced(
  search.value,
  async () => {
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // update url query params
    router.push({
      path: '/master/suppliers',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
    // call api
    await getSuppliers()
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

// Section Pagination
const updateData = async () => {
  await getSuppliers()
  router.push({
    path: '/master/suppliers',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      ...route.query
    }
  })
}

const getSuppliers = async () => {
  const response = await axios.get('/v1/suppliers', {
    params: {
      filter: {
        search: searchAll.value,
        code: search.value.code,
        name: search.value.name,
        supplier_group: search.value.supplier_group
      },
      page: pagination.value.page
    }
  })
  suppliers.value = response.data.data
  pagination.value = response.data.pagination
}
const rowMenuRef = ref()
const suppliers = ref<ISupplier[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
onMounted(async () => {
  searchAll.value = route.query.search?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  await getSuppliers()
})
const openMenu = (supplier: ISupplier, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: supplier._id,
    name: `[${supplier.code}] ${supplier.name}`
  })
}
const onDelete = async () => {
  await getSuppliers()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card>
      <template #header>Suppliers</template>
      <div class="my-5 flex gap-2">
        <router-link to="/master/suppliers/create">
          <base-button color="info" shape="sharp">Create</base-button>
        </router-link>
        <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
      </div>
      <div class="flex flex-col gap-4">
        <base-table>
          <thead>
            <tr>
              <th class="w-1"></th>
              <th>Code</th>
              <th>Name</th>
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
              <td colspan="4">
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
                                <base-icon class="text-xl" icon="i-ph-pencil"></base-icon>
                                <p>Manage</p>
                              </div>
                            </base-button>
                          </router-link>
                          <base-divider orientation="vertical" class="my-1!"></base-divider>
                          <base-button
                            variant="text"
                            color="danger"
                            @click="openMenu(supplier, index)"
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
                <td>[{{ supplier.supplier_group.code }}] {{ supplier.supplier_group.name }}</td>
              </tr>
            </template>
          </tbody>
        </base-table>
        <base-pagination
          v-if="!isLoading"
          v-model="pagination.page"
          :page-size="pagination.page_size"
          :total-document="pagination.total_document"
          @update:model-value="updateData()"
        />
      </div>
    </base-card>

    <delete-modal ref="deleteModalRef" @deleted="onDelete" />
  </div>
</template>

<style scoped lang="postcss"></style>
