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
    code: 'CUS-1',
    name: 'SUMBER BERKAT MAKMUR',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'CUS-2',
    name: 'PAK RICHMON',
    email: 'aainfo41@gmail.com',
    address: '',
    phone: ''
  },
  {
    code: 'CUS-3',
    name: 'BU JUNI',
    email: '',
    address: '',
    phone: '#ERROR!'
  },
  {
    code: 'CUS-4',
    name: 'BU KARTIKA',
    email: 'aainfo41@gmail.com',
    address: '',
    phone: '0811 341 305'
  },
  {
    code: 'CUS-5',
    name: 'MARIANA',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'CUS-6',
    name: 'PAK MARTIN',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'CUS-7',
    name: 'AGUNG WICAKSONO',
    email: 'aainfo.24@gmail.com',
    address:
      'PERUM MENTARI BUMI SEJAHTERA BLOK DA NO 9 DESA KALIPECABEAN LINGKAR TIMUR KLURAK CANDI SIDOARJO',
    phone: ''
  },
  {
    code: 'CUS-8',
    name: 'Muh. Ahyat',
    email: 'COPPADEJAVA@GMAIL.COM',
    address: 'Rowokembu kaum rt 3/2 kec wonopringgo kab pekalongan',
    phone: ''
  },
  {
    code: 'CUS-9',
    name: 'Ratna',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'CUS-10',
    name: 'DENOK',
    email: 'aainfo.24@gmail.com',
    address: '',
    phone: ''
  },
  {
    code: 'CUS-11',
    name: 'BU GINIK',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'CUS-12',
    name: 'PT KARUNIA DISTRIBUSI UTAMA',
    email: 'coppadejava@gmail.com',
    address: 'KOMPLEKS OERGUDANGAN PESONA AJUNG OARK KAV 15 JL MH THAMRIN AJUNG, JEMBER',
    phone: '3314350010'
  },
  {
    code: 'CUS-13',
    name: 'BANK MANDIRI',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'CUS-14',
    name: 'JOHAN',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'CUS-15',
    name: 'VERA',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'CUS-16',
    name: 'BU DEWI',
    email: 'aainfo41@gmail.com',
    address: '',
    phone: ''
  },
  {
    code: 'CUS-17',
    name: 'HUDI',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: '',
    name: '',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: '',
    name: '',
    email: '',
    address: '',
    phone: ''
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
      <template #header>Customers</template>
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
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
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
                <td>{{ data.email }}</td>
                <td>{{ data.address }}</td>
                <td>{{ data.phone }}</td>
              </tr>
            </template>
          </tbody>
        </base-table>
        <base-pagination v-model="page" :page-size="10" :total-document="10" />
      </div>
    </base-card>
  </div>
</template>
