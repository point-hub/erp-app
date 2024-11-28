<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CardBreadcrumbs from './card-breadcrumbs.vue'

const page = ref(1)
const searchAll = ref('')
const isLoading = ref(false)

const datas = ref([])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const result = ref<any[]>([])
onMounted(() => {
  result.value = datas.value
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card>
      <template #header>Cash Advances</template>
      <div class="my-5 flex gap-2">
        <router-link to="/purchasing/purchase-requests/create">
          <base-button color="info" shape="sharp" class="truncate">Create</base-button>
        </router-link>
        <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
      </div>
      <div class="flex flex-col gap-4">
        <base-table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Form</th>
              <th>Employee</th>
              <th>Notes</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Status</th>
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
              <tr v-for="(data, index) in result" :key="index">
                <td>{{ data.name }}</td>
              </tr>
            </template>
          </tbody>
        </base-table>
        <base-pagination v-model="page" :page-size="10" :total-document="10" />
      </div>
    </base-card>
  </div>
</template>
