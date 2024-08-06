<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useToastStore } from '@/stores/toast.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'

const page = 1
const searchAll = ref('')
const isLoading = ref(false)

const { toastRef } = useToastStore()

const datas = ref([
  {
    name: 'gmbtest',
    email: 'gmbtest@example.com'
  }
])

const onCreateClick = () => {
  useToastStore()
  toastRef.toast('Unauthorized access', { color: 'danger' })
}

const result = ref<any[]>([])
onMounted(() => {
  result.value = datas.value
})

watch(searchAll, () => {
  result.value = datas.value.filter((data) => {
    return data.name.includes(searchAll.value)
  })
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <base-card>
      <template #header>Users</template>
      <div class="my-5 flex gap-2">
        <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
      </div>
      <div class="flex flex-col gap-4">
        <base-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
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
                <td>{{ data.email }}</td>
              </tr>
            </template>
          </tbody>
        </base-table>
        <base-pagination v-model="page" :page-size="10" :total-document="10" />
      </div>
    </base-card>
  </div>
</template>
