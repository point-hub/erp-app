<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'

import CardBreadcrumbs from './card-breadcrumbs.vue'

const route = useRoute()
const router = useRouter()

interface IBranch {
  _id: string
  module: string
  feature: string
}
const searchAll = ref('')
const search = ref({
  module: '',
  feature: ''
})
const isLoading = ref(false)

watchDebounced(
  searchAll,
  async () => {
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // call api
    await getSettingJournals()
    // update url query params
    router.push({
      path: '/master/setting-journals',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
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
    // call api
    await getSettingJournals()
    // update url query params
    router.push({
      path: '/master/setting-journals',
      query: {
        search: searchAll.value,
        page: pagination.value.page
      }
    })
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

// Section Pagination
const updateData = async () => {
  await getSettingJournals()
  router.push({
    path: '/master/setting-journals',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      ...route.query
    }
  })
}

const getSettingJournals = async () => {
  const response = await axios.get('/v1/setting-journals', {
    params: {
      filter: {
        search: searchAll.value,
        module: search.value.module,
        feature: search.value.feature
      },
      page: pagination.value.page
    }
  })
  settingJournals.value = response.data.data
  pagination.value = response.data.pagination
}
const settingJournals = ref<IBranch[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
onMounted(async () => {
  searchAll.value = route.query.search?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  await getSettingJournals()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card>
      <template #header>Setting Journals</template>
      <div class="my-5 flex gap-2">
        <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
      </div>
      <div class="flex flex-col gap-4">
        <base-table>
          <thead>
            <tr>
              <th class="w-1">Module</th>
              <th>Feature</th>
            </tr>
            <tr class="bg-slate-50 dark:bg-slate-700">
              <th class="basic-table-head">
                <base-input required v-model="search.module" placeholder="Search" border="none" />
              </th>
              <th class="basic-table-head">
                <base-input required v-model="search.feature" placeholder="Search" border="none" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="2">
                <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                  <base-spinner color="primary" size="xs" /> <span>Loading</span>
                </p>
              </td>
            </tr>
            <template v-if="!isLoading">
              <tr v-for="(settingJournal, index) in settingJournals" :key="index">
                <td>{{ settingJournal.module }}</td>
                <td>
                  <router-link
                    :to="`/master/setting-journals/${settingJournal._id}`"
                    class="text-blue"
                  >
                    {{ settingJournal.feature }}
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
          @update:model-value="updateData()"
        />
      </div>
    </base-card>
  </div>
</template>
