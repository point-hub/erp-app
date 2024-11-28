<script setup lang="ts">
import { numberFormat } from '@point-hub/js-utils'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

interface ISettingJournal {
  _id: string
  module: string
  feature: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  journals: { [key: string]: any }[]
}

const isLoading = ref(false)

const getSettingJournal = async () => {
  const response = await axios.get(`/v1/master/setting-journals/${route.params.id}`)
  settingJournal.value = response.data
}

const settingJournal = ref<ISettingJournal>()

onMounted(async () => {
  if (!authStore.permission?.master?.setting_journals?.read) {
    router.push('/unauthorized')
  }

  await getSettingJournal()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!" v-if="authStore.permission?.master?.setting_journals?.update">
      <div class="flex gap-2">
        <router-link :to="`/master/setting-journals/${route.params.id}/edit`">
          <base-button color="info" size="sm">Edit</base-button>
        </router-link>
      </div>
    </base-card>

    <base-card>
      <template #header>Setting Journals</template>
      <h3 class="capitalize">{{ settingJournal?.module }} | {{ settingJournal?.feature }}</h3>

      <div class="flex flex-col gap-4 my-5">
        <base-table>
          <thead>
            <tr>
              <th class="">Account</th>
              <th class="">Chart of Account</th>
              <th class="w-40 text-right">Debit</th>
              <th class="w-40 text-right">Credit</th>
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
              <tr v-for="journal in settingJournal?.journals" :key="journal._id">
                <td>
                  <p>{{ journal.account }}</p>
                  <p class="text-xs">{{ journal.description }}</p>
                  <div class="mt-2">
                    <p class="text-xs" v-if="journal.category">
                      <span class="font-semibold">Category:</span> {{ journal.category }}
                    </p>
                    <p class="text-xs" v-if="journal.subledger">
                      <span class="font-semibold">Subledger:</span> {{ journal.subledger }}
                    </p>
                  </div>
                </td>
                <td>
                  <span v-if="journal.editable && Object.keys(journal.chart_of_account).length">
                    [{{ journal.chart_of_account.number }}] {{ journal.chart_of_account.name }}
                  </span>
                </td>
                <td class="text-right">
                  {{
                    journal.position.toLowerCase() === 'debit' ? numberFormat(journal.value) : ''
                  }}
                </td>
                <td class="text-right">
                  {{
                    journal.position.toLowerCase() === 'credit' ? numberFormat(journal.value) : ''
                  }}
                </td>
              </tr>
            </template>
          </tbody>
        </base-table>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
