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
    code: 'SUP-1',
    name: 'BUMI LAUTAN KOPI',
    email: 'bumilautankopi.adm@gmail.com',
    address: 'dsn. tambakrejo, ds. gayaman, kec. mojoanyar-mojokerto',
    phone: '(0321) 391145'
  },
  {
    code: 'SUP-2',
    name: 'DUA BURUNG',
    email: '',
    address: 'DELTA HARMONI 52 WARU, DELTASARI BARU',
    phone: '031 - 8550694'
  },
  {
    code: 'SUP-3',
    name: 'HADI SUCIPTO',
    email: '',
    address: '',
    phone: '0812 3254 7188'
  },
  {
    code: 'SUP-4',
    name: 'TOKO MERBABU',
    email: '',
    address: 'JL MERBABU 2',
    phone: '031 534 1825'
  },
  {
    code: 'SUP-5',
    name: 'TOKO AVRILYA JAYA',
    email: '',
    address: 'JL REJOSARI KAV. JERUK BLOK A NO 7-8 BENOWO, PAKAL',
    phone: '0822 459 352 35'
  },
  {
    code: 'SUP-6',
    name: 'PT SURYA INDO PLASTIC',
    email: '',
    address: 'Jl. Raya Lebo no. 2 Sidoarjo',
    phone: '#ERROR!'
  },
  {
    code: 'SUP-7',
    name: 'RUMAH PLASTIK',
    email: 'rumah.plastik@yahoo.com',
    address: 'Jl Ngagel Jaya Utara 131, Surabaya',
    phone: '031-5023018 / 083849297011'
  },
  {
    code: 'SUP-8',
    name: 'sarana mesin',
    email: 'saranamesin@yahoo.co.id',
    address: 'Rungkut Asri VII/22, Surabaya',
    phone: '#ERROR!'
  },
  {
    code: 'SUP-9',
    name: 'LANCAR JAYA',
    email: '',
    address: 'JL SEMARANG NO 5',
    phone: '031 5490244'
  },
  {
    code: 'SUP-10',
    name: 'JAWA INDAH',
    email: '',
    address: 'JL KRAMAT GANTUNG 118',
    phone: '031 5310268'
  },
  {
    code: 'SUP-11',
    name: 'SS STATIONARY',
    email: '',
    address: '',
    phone: '031 561 544 45'
  },
  {
    code: 'SUP-12',
    name: 'TOGAMAS',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'SUP-13',
    name: 'KARYA SEJATI',
    email: 'AAINFO.24@GMAIL.COM',
    address: 'JL JEPARA NO 24 SURABAYA',
    phone: '0812 3440 8585'
  },
  {
    code: 'SUP-14',
    name: 'SMILE ISLAND',
    email: 'ADMIN@SMILEISLANDS.COM',
    address: 'NGAGEL JAYA TENGAH 84',
    phone: '031 504 0908'
  },
  {
    code: 'SUP-15',
    name: 'ELLENa packaging',
    email: '',
    address: '',
    phone: '0817 372 633'
  },
  {
    code: 'SUP-16',
    name: 'MERDEKA JAYA',
    email: '',
    address: 'PS GENTENG LT 2 BLOK O-8',
    phone: '031 535 0502 , 531 2959 , 0812 165 06123 , 0821 4129 1988'
  },
  {
    code: 'SUP-17',
    name: 'MAESTRO',
    email: 'MAESTROPHOTOCOPY@YAHOO.CO.ID',
    address: 'JL RAYA GUBENG 30 A-B',
    phone: '031 5051888'
  },
  {
    code: 'SUP-18',
    name: 'PUSAT GELAS',
    email: 'PUSAT.GELAS@GMAIL.COM',
    address: 'JL WONOCOLO PABRIK KULIT NO 112 SURABAYA',
    phone: '0852 379 05878'
  },
  {
    code: 'SUP-19',
    name: 'ALFAMART',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'SUP-20',
    name: 'SPBU',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'SUP-21',
    name: 'DEPO SLAMET',
    email: '',
    address: 'JL DHARMAHUSADA 6B SURABAYA',
    phone: '5032810 - 5021443'
  },
  {
    code: 'SUP-22',
    name: 'karyawan kopi bara',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'SUP-23',
    name: 'PT KARUNIA INDAH DELAPAN EXPRESS',
    email: '',
    address: '',
    phone: '81252665627'
  },
  {
    code: 'SUP-24',
    name: 'PT KEDAWUNG SUBUR',
    email: 'SHOWROOMSBY@GMAIL.COM',
    address: 'JL RAYA RUNGKUT NO 15-17',
    phone: '031-8700006 , 8700088'
  },
  {
    code: 'SUP-25',
    name: 'TOKO SEMERU',
    email: '',
    address: 'JL KEDUNGDORO 283 SURABAYA',
    phone: '031 5459367 - 081 831 6898'
  },
  {
    code: 'SUP-26',
    name: 'cafe glass',
    email: '',
    address: 'raya nginden 72a',
    phone: '031 5057188 , 5057288'
  },
  {
    code: 'SUP-27',
    name: 'TOKO ERIC',
    email: '',
    address: 'JL LIDAH KULON NO 9',
    phone: ''
  },
  {
    code: 'SUP-28',
    name: 'UBER',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'SUP-29',
    name: 'U PRINT',
    email: '',
    address: 'JL SWADAYA RAYA 1762',
    phone: ''
  },
  {
    code: 'SUP-30',
    name: 'JNE SURABAYA',
    email: '',
    address: 'JL RAYA JUANDA KM2-3 SEMAMBUNG',
    phone: '031 99209000'
  },
  {
    code: 'SUP-31',
    name: 'MUSI',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'SUP-32',
    name: 'FOODTRUCK',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'SUP-33',
    name: 'MANUKAN',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'SUP-34',
    name: 'PT INDRACO JAYA PERKASA',
    email: '',
    address: 'JL MAYJEND YONO SOEWOYO 66',
    phone: ''
  },
  {
    code: 'SUP-35',
    name: 'SUARA MAS',
    email: '',
    address: 'JL GENTENG BESAR 51',
    phone: '031 5341491 / 5327 432'
  },
  {
    code: 'SUP-36',
    name: 'IRAMA MAS',
    email: '',
    address: 'JL PASAR GENTENG BARU LT III / Q1',
    phone: '031 5455553'
  },
  {
    code: 'SUP-37',
    name: 'PRIMA MANDIRI',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'SUP-38',
    name: 'TANPA NAMA',
    email: 'NULL',
    address: 'NULL',
    phone: 'NULL'
  },
  {
    code: 'SUP-39',
    name: 'DHIAFALAH CELLULER',
    email: '',
    address: 'JL KOTA BLATER 3 PASAR PONTANG AMBULU',
    phone: ''
  },
  {
    code: 'SUP-40',
    name: 'TRAVELOKA',
    email: 'CS@TRAVELOKA.COM',
    address: '',
    phone: '021 2910 3300'
  },
  {
    code: 'SUP-41',
    name: 'INDOMARET',
    email: '',
    address: '',
    phone: ''
  },
  {
    code: 'SUP-42',
    name: 'CM RESTO FRIED CHICKEN',
    email: '',
    address: 'JL KOTA BLATER KM 4 WATUKEBO',
    phone: '0331 7758352'
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
      <template #header>Suppliers</template>
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
