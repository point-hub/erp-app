<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import axios from '@/axios'

import { useForm } from './form'

const route = useRoute()

const form = reactive(useForm())

const formId = ref()

const permissions = ref([
  {
    feature: 'users',
    rows: false,
    create: false,
    read: false,
    edit: false,
    delete: false
  },
  {
    feature: 'roles',
    rows: false,
    create: false,
    read: false,
    edit: false,
    delete: false
  },
  {
    feature: 'Allocation Groups',
    rows: false,
    create: false,
    read: false,
    edit: false,
    delete: false
  },
  {
    feature: 'Allocations',
    rows: false,
    create: false,
    read: false,
    edit: false,
    delete: false
  },
  {
    feature: 'Supplier Groups',
    rows: false,
    create: false,
    read: false,
    edit: false,
    delete: false
  },
  {
    feature: 'Suppliers',
    rows: false,
    create: false,
    read: false,
    edit: false,
    delete: false
  }
])

watch(permissions, (val) => {
  console.log(val)
})

onMounted(async () => {
  const response = (await axios.get(`/v1/roles/${route.params.id}`)).data
  formId.value = response._id
  form.data.code = response.code
  form.data.name = response.name
})
</script>

<template>
  <base-card>
    <template #header>Permissions</template>
    <BaseTabGroup as="div" class="dark:bg-slate-800">
      <BaseTabList class="tablist">
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0);"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            <base-icon icon="i-far-user-check" />
            Master
          </a>
        </BaseTab>
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0);"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            <base-icon icon="i-far-user-check" />
            Purchasing
          </a>
        </BaseTab>
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0);"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            <base-icon icon="i-far-user-check" />
            Sales
          </a>
        </BaseTab>
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0);"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            <base-icon icon="i-far-user-check" />
            Finance
          </a>
        </BaseTab>
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0);"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            <base-icon icon="i-far-user-check" />
            Manufacture
          </a>
        </BaseTab>
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0);"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            <base-icon icon="i-far-user-check" />
            Inventory
          </a>
        </BaseTab>
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0);"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            <base-icon icon="i-far-user-check" />
            Accounting
          </a>
        </BaseTab>
      </BaseTabList>
      <BaseTabPanels class="flex-1 text-sm p-4">
        <BaseTabPanel>
          <div></div>
          <base-table>
            <thead>
              <tr>
                <th class="w-0">
                  <base-button color="primary" variant="filled" size="xs"> Select All </base-button>
                </th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Edit</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="permission in permissions" :key="permission.feature">
                <td>
                  <div class="flex items-center justify-center">
                    <base-checkbox v-model="permission.rows" class="-mr-2" />
                  </div>
                </td>
                <td>
                  <p class="capitalize">{{ permission.feature }}</p>
                </td>
                <td>
                  <div class="flex items-center justify-center">
                    <base-checkbox v-model="permission.read" class="-mr-2" />
                  </div>
                </td>
                <td>
                  <div class="flex items-center justify-center">
                    <base-checkbox v-model="permission.create" class="-mr-2" />
                  </div>
                </td>
                <td>
                  <div class="flex items-center justify-center">
                    <base-checkbox v-model="permission.edit" class="-mr-2" />
                  </div>
                </td>
                <td>
                  <div class="flex items-center justify-center">
                    <base-checkbox v-model="permission.delete" class="-mr-2" />
                  </div>
                </td>
              </tr>
            </tbody>
          </base-table>
        </BaseTabPanel>
        <BaseTabPanel>
          <h4 class="mb-4 text-2xl font-semibold">Profile</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Convallis convallis tellus id interdum
            velit. Nunc sed blandit libero volutpat sed cras ornare arcu. Lectus arcu bibendum at
            varius vel pharetra vel. Consectetur lorem donec massa sapien faucibus et.
          </p>
        </BaseTabPanel>
        <BaseTabPanel>
          <h4 class="mb-4 text-2xl font-semibold">Contact 1</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Viverra nam libero justo laoreet sit amet.
            Ultrices vitae auctor eu augue ut lectus arcu bibendum.
          </p>
        </BaseTabPanel>
        <BaseTabPanel>
          <h4 class="mb-4 text-2xl font-semibold">Contact 2</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Viverra nam libero justo laoreet sit amet.
            Ultrices vitae auctor eu augue ut lectus arcu bibendum.
          </p>
        </BaseTabPanel>
        <BaseTabPanel>
          <h4 class="mb-4 text-2xl font-semibold">Contact 3</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Viverra nam libero justo laoreet sit amet.
            Ultrices vitae auctor eu augue ut lectus arcu bibendum.
          </p>
        </BaseTabPanel>
        <BaseTabPanel>
          <h4 class="mb-4 text-2xl font-semibold">Contact 4</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Viverra nam libero justo laoreet sit amet.
            Ultrices vitae auctor eu augue ut lectus arcu bibendum.
          </p>
        </BaseTabPanel>
        <BaseTabPanel>
          <h4 class="mb-4 text-2xl font-semibold">Contact 5</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Viverra nam libero justo laoreet sit amet.
            Ultrices vitae auctor eu augue ut lectus arcu bibendum.
          </p>
        </BaseTabPanel>
      </BaseTabPanels>
    </BaseTabGroup>
  </base-card>
</template>

<style scoped lang="postcss">
.tablist {
  @apply flex overflow-x-auto overflow-y-hidden pt-4 border-b border-slate-200 dark:border-[#191e3a] scrollbar-hidden;
}
.tab {
  @apply flex pb-2 px-4 gap-2 items-center -mb-[1px] !outline-none whitespace-nowrap;
}
</style>
