<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useToastStore } from '@/stores/toast-store'

import CardBreadcrumbs from './card-breadcrumbs.vue'

const page = 1
const searchAll = ref('')
const isLoading = ref(false)

const { toastRef } = useToastStore()

const datas = ref([
  {
    code: 'AS',
    name: 'AEROPRESS SUPPORT',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S001-L2',
    name: 'ARABICA ACEH GAYO LIGHT 200 GRAM',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S006-1',
    name: 'ARABICA ARJUNA',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S003-1',
    name: 'Arabica Flores Bajawa',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S013-1',
    name: 'ARABICA FLORES BAJAWA HONEY',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S013-L',
    name: 'ARABICA FLORES BAJAWA HONEY LIGHT 1 KG',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S013-1-L',
    name: 'ARABICA FLORES BAJAWA HONEY LIGHT 200 GRAM',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S003-L2',
    name: 'ARABICA FLORES BAJAWA LIGHT 200 GRAM',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S001-1',
    name: 'Arabica Gayo 200 GR',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S001-L',
    name: 'ARABICA GAYO LIGHT 1 KG',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S001-1-L',
    name: 'ARABICA GAYO LIGHT 200 GRAM',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S014-1',
    name: 'ARABICA JAMBI KERINCI',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S004-1',
    name: 'Arabica Kintamani',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S007-1',
    name: 'ARABICA LINTONG',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S017',
    name: 'ARABICA MAMASA',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S008-1',
    name: 'ARABICA MANDAILING 200 GR',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S002-1',
    name: 'Arabica Sidikalang 200 GR',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S005-1',
    name: 'ARABICA TORAJA',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S017-1',
    name: 'ARABICA TORAJA MAMASA 200 GR',
    account: '10404 - PERSEDIAAN BARANG JADI'
  },
  {
    code: 'S006',
    name: 'ARABICAARJUNA',
    account: '10404 - PERSEDIAAN BARANG JADI'
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
      <template #header>Items</template>
      <div class="my-5 flex gap-2">
        <base-button @click="onCreateClick" color="primary" shape="sharp">Create</base-button>
        <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
      </div>
      <div class="flex flex-col gap-4">
        <base-table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Account</th>
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
                <td>{{ data.code }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.account }}</td>
              </tr>
            </template>
          </tbody>
        </base-table>
        <base-pagination v-model="page" :page-size="10" :total-document="10" />
      </div>
    </base-card>
  </div>
</template>
