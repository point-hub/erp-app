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

interface IItem {
  _id: string
  chart_of_account: {
    code: string
    name: string
  }
  category: {
    code: string
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
  category: '',
  code: '',
  name: '',
  unit: '',
  have_production_number: '',
  have_an_expiry_date: ''
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
      path: '/master/items',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
    // call api
    await getItems()
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
      path: '/master/items',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
    // call api
    await getItems()
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

// Section Pagination
const updateData = async () => {
  await getItems()
  router.push({
    path: '/master/items',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      ...route.query
    }
  })
}

const getItems = async () => {
  const response = await axios.get('/v1/items', {
    params: {
      filter: {
        search: searchAll.value,
        code: search.value.code,
        name: search.value.name,
        category: search.value.category
      },
      page: pagination.value.page
    }
  })
  items.value = response.data.data
  pagination.value = response.data.pagination
}
const rowMenuRef = ref()
const items = ref<IItem[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
onMounted(async () => {
  searchAll.value = route.query.search?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  await getItems()
})
const openMenu = (item: IItem, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: item._id,
    name: `[${item.code}] ${item.name}`
  })
}
const onDelete = async () => {
  await getItems()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card>
      <template #header>Items</template>
      <div class="my-5 flex gap-2">
        <router-link to="/master/items/create">
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
              <th>Branch</th>
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
                <base-input required v-model="search.category" placeholder="Search" border="none" />
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
                          <base-button variant="text" color="danger" @click="openMenu(item, index)">
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
                <td>[{{ item.category.code }}] {{ item.category.name }}</td>
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
