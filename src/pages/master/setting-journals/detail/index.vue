<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from '@/axios'

import CardBreadcrumbs from './card-breadcrumbs.vue'

const route = useRoute()
const router = useRouter()

interface ISettingJournal {
  _id: string
  module: string
  feature: string
}

const isLoading = ref(false)

const getSettingJournal = async () => {
  const response = await axios.get(`/v1/setting-journals/${route.params.id}`)
  settingJournal.value = response.data
}

const settingJournal = ref<ISettingJournal>()

onMounted(async () => {
  await getSettingJournal()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <base-card class="py-4!">
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
              <tr v-for="journal in settingJournal?.journals" :key="journal">
                <td>
                  <p>{{ journal.account }}</p>
                  <p class="text-xs">{{ journal.description }}</p>
                </td>
                <td class="uppercase">
                  <span v-if="Object.keys(journal.chart_of_account).length">
                    [{{ journal.chart_of_account.number }}] {{ journal.chart_of_account.name }}
                  </span>
                </td>
                <td class="text-right">
                  {{ journal.position === 'debit' ? 'xxx' : '' }}
                </td>
                <td class="text-right">
                  {{ journal.position === 'credit' ? 'xxx' : '' }}
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
