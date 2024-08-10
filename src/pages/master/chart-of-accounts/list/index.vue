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

interface IChartOfAccount {
  _id: string
  type: {
    _id: string
    name: string
  }
  category: {
    _id: string
    name: string
  }
  number: string
  name: string
  subledger: string
  increasing_in: string
}
const searchAll = ref('')
const search = ref({
  type: '',
  category: '',
  number: '',
  name: '',
  subledger: '',
  increasing_in: ''
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
      path: '/master/chart-of-accounts',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
    // call api
    await getChartOfAccounts()
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
      path: '/master/chart-of-accounts',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
    // call api
    await getChartOfAccounts()
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

// Section Pagination
const updateData = async () => {
  await getChartOfAccounts()
  router.push({
    path: '/master/chart-of-accounts',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      ...route.query
    }
  })
}

const getChartOfAccounts = async () => {
  const response = await axios.get('/v1/chart-of-accounts', {
    params: {
      filter: {
        search: searchAll.value,
        type: search.value.type,
        category: search.value.category,
        number: search.value.number,
        name: search.value.name,
        subledger: search.value.subledger
      },
      page: pagination.value.page
    }
  })
  chartOfAccounts.value = response.data.data
  pagination.value = response.data.pagination
}
const rowMenuRef = ref()
const chartOfAccounts = ref<IChartOfAccount[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
onMounted(async () => {
  searchAll.value = route.query.search?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  await getChartOfAccounts()
})
const openMenu = (chartOfAccount: IChartOfAccount, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: chartOfAccount._id,
    name: `[${chartOfAccount.number}] ${chartOfAccount.name}`
  })
}
const onDelete = async () => {
  await getChartOfAccounts()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card>
      <template #header>Chart of Accounts</template>
      <div class="my-5 flex gap-2">
        <router-link to="/master/chart-of-accounts/create">
          <base-button color="info" shape="sharp">Create</base-button>
        </router-link>
        <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
      </div>
      <div class="flex flex-col gap-4">
        <base-table>
          <thead>
            <tr>
              <th class="w-1"></th>
              <th class="w-1">Type</th>
              <th class="w-20%">Category</th>
              <th class="w-1">Number</th>
              <th>Name</th>
              <th class="w-1">Subledger</th>
            </tr>
            <tr class="bg-slate-50 dark:bg-slate-700">
              <th></th>
              <th class="basic-table-head">
                <base-input required v-model="search.type" placeholder="Search" border="none" />
              </th>
              <th class="basic-table-head">
                <base-input required v-model="search.category" placeholder="Search" border="none" />
              </th>
              <th class="basic-table-head">
                <base-input required v-model="search.number" placeholder="Search" border="none" />
              </th>
              <th class="basic-table-head">
                <base-input required v-model="search.name" placeholder="Search" border="none" />
              </th>
              <th class="basic-table-head">
                <base-input
                  required
                  v-model="search.subledger"
                  placeholder="Search"
                  border="none"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="6">
                <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                  <base-spinner color="primary" size="xs" /> <span>Loading</span>
                </p>
              </td>
            </tr>
            <template v-if="!isLoading">
              <tr v-for="(chartOfAccount, index) in chartOfAccounts" :key="index">
                <td>
                  <base-popover placement="bottom" ref="rowMenuRef">
                    <base-button size="xs" @click="rowMenuRef[index].toggle()">
                      <base-icon class="text-xl" icon="i-ph-dots-three-bold"></base-icon>
                    </base-button>
                    <template #content>
                      <base-card class="py-1! px-2! text-sm">
                        <div class="flex flex-col">
                          <router-link :to="`/master/chart-of-accounts/${chartOfAccount._id}`">
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
                            @click="openMenu(chartOfAccount, index)"
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
                <td>{{ chartOfAccount.type.name }}</td>
                <td>{{ chartOfAccount.category.name }}</td>
                <td>
                  <router-link
                    :to="`/master/chart-of-accounts/${chartOfAccount._id}`"
                    class="text-blue"
                  >
                    {{ chartOfAccount.number }}
                  </router-link>
                </td>
                <td>{{ chartOfAccount.name }}</td>
                <td>{{ chartOfAccount.subledger }}</td>
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
