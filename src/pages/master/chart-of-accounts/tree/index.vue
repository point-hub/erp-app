<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import type { IChartOfAccount } from '../interface'
import CardBreadcrumbs from './card-breadcrumbs.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()
const searchAll = ref('')
const search = ref({
  type: '',
  category: '',
  number: '',
  name: '',
  subledger: ''
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
      path: '/master/chart-of-accounts/tree',
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
      path: '/master/chart-of-accounts/tree',
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
    path: '/master/chart-of-accounts/tree',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      ...route.query
    }
  })
}

const getChartOfAccounts = async () => {
  const response = await axios.get('/v1/master/chart-of-accounts', {
    params: {
      filter: {
        search: searchAll.value,
        type: search.value.type,
        category: search.value.category,
        number: search.value.number,
        name: search.value.name,
        subledger: search.value.subledger
      },
      page: pagination.value.page,
      page_size: 9999,
      sort: 'category,number'
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
  if (!authStore.permission?.master?.chart_of_accounts?.read) {
    router.push('/unauthorized')
  }

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

let itCategory = ''
const isCategory = (_id: string) => {
  console.log(itCategory, _id)
  if (itCategory !== _id) {
    itCategory = _id
    return true
  }

  return false
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card>
      <template #header>Chart of Accounts</template>
      <div class="my-5 flex gap-2">
        <router-link
          to="/master/chart-of-accounts/create"
          v-if="authStore.permission?.master?.chart_of_accounts?.create"
        >
          <base-button color="info" shape="sharp">Create</base-button>
        </router-link>
        <router-link
          to="/master/chart-of-accounts"
          v-if="authStore.permission?.master?.chart_of_accounts?.read"
        >
          <base-button color="info" shape="sharp">
            <base-icon icon="i-far-list" class="h-6" />
          </base-button>
        </router-link>
        <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
      </div>
      <div class="flex flex-col gap-4">
        <div></div>
        <base-table>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="6">
                <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                  <base-spinner color="primary" size="xs" /> <span>Loading</span>
                </p>
              </td>
            </tr>
            <template v-if="!isLoading">
              <template v-for="(chartOfAccount, index) in chartOfAccounts" :key="index">
                <tr v-if="isCategory(chartOfAccount.category._id)">
                  <th class="w-1">{{ chartOfAccount.category.name }}</th>
                  <th class="w-1"></th>
                </tr>
                <tr>
                  <td>
                    <router-link
                      :to="`/master/chart-of-accounts/${chartOfAccount._id}`"
                      class="text-blue"
                    >
                      <span class="font-mono">[{{ chartOfAccount.number }}] </span>
                      <span>{{ chartOfAccount.name }}</span>
                    </router-link>
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
          @update:model-value="updateData()"
        />
      </div>
    </base-card>

    <delete-modal ref="deleteModalRef" @deleted="onDelete" />
  </div>
</template>

<style scoped lang="postcss"></style>
