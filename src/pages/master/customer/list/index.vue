<script setup lang="ts">
import {
  BaseAutocomplete,
  BaseButton,
  BaseCard,
  BaseCheckbox,
  BaseDivider,
  BaseInput,
  BaseModal,
  BasePagination,
  BaseTable
} from '@point-hub/papp'
import { computed, ref } from 'vue'

// Table Header
const options = [
  { id: 1, label: 'Name' },
  { id: 2, label: 'Branch' },
  { id: 3, label: 'Warehouse' }
]

const selected = ref()
const searchAll = ref('')
const search = ref<string[]>([])

// Table Data
interface UserInterface {
  id: number
  name: string
  username: string
  role: string
  branch: string
  warehouse: string
  checked?: boolean
}

const users = ref<UserInterface[]>([
  {
    id: 1,
    name: 'Admin',
    username: 'admin',
    role: 'administrator',
    branch: 'main',
    warehouse: 'central'
  }
])

// Section Pagination
const page = ref(1)
const pageSize = ref(1)
const totalDocument = ref(1)

const updateData = () => {}

// Table Setting
const showModal = ref(false)
const openTableSetting = () => {
  showModal.value = true
}

const columns = ref([
  {
    name: 'Checkbox',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Name',
    isShow: true,
    isEditable: false
  },
  {
    name: 'Username',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Branch',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Warehouse',
    isShow: true,
    isEditable: true
  }
])

const optionsPageSize = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' }
]

// Selecting Table Row
const selectAll = computed({
  get() {
    return isCheckedAll()
  },
  set() {
    if (isCheckedAll()) {
      users.value.forEach((user) => {
        user.checked = false
      })
    } else {
      users.value.forEach((user) => {
        user.checked = true
      })
    }
  }
})

const isCheckedAll = () => {
  for (const user of users.value) {
    if (user.checked === undefined || user.checked === false) {
      return false
    }
  }

  return true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>User</h1>
    <component :is="BaseCard" header="s">
      <div class="flex flex-col gap-4">
        <div class="w-full flex items-center gap-4">
          <div class="w-full flex gap-2">
            <component :is="BaseButton" color="primary" border="none" shape="sharp" class="gap-1">
              <base-icon icon="i-far-pen-to-square" />
              <span>Add</span>
            </component>
            <component
              :is="BaseInput"
              v-model="searchAll"
              placeholder="Search"
              border="full"
              class="flex-1"
            >
              <template #prefix>
                <base-icon icon="i-far-magnifying-glass" class="mx-3" />
              </template>
            </component>
          </div>
        </div>
        <component :is="BaseModal" :is-open="showModal" @on-close="showModal = false" size="xl">
          <div class="max-h-90vh overflow-auto p-8 space-y-6">
            <h2 class="text-2xl font-bold">Table Setting</h2>
            <div class="space-y-2">
              <h3 class="font-extrabold text-lg">Column Chooser</h3>
              <div class="space-y-2">
                <component
                  v-for="(column, index) in columns"
                  :key="index"
                  :id="column.name"
                  :is="BaseCheckbox"
                  :disabled="!column.isEditable"
                  v-model="column.isShow"
                  :text="column.name"
                />
              </div>
            </div>
            <component :is="BaseDivider" orientation="vertical" />
            <div class="space-y-2">
              <h3 class="font-extrabold text-lg">Pagination</h3>
              <component
                :is="BaseAutocomplete"
                v-model="selected"
                :options="optionsPageSize"
                placeholder="Search"
                label="Page Size"
                layout="horizontal"
                description="data per page"
              ></component>
            </div>
            <component
              :is="BaseButton"
              color="primary"
              size="md"
              is-block
              @click="showModal = false"
            >
              Close
            </component>
          </div>
        </component>
        <component :is="BaseTable">
          <thead>
            <tr>
              <th v-if="columns[0].isShow">
                <component :is="BaseCheckbox" v-model="selectAll" />
              </th>
              <th v-if="columns[1].isShow">Name</th>
              <th v-if="columns[2].isShow">Username</th>
              <th v-if="columns[3].isShow">Role</th>
              <th v-if="columns[4].isShow">Branch</th>
              <th v-if="columns[5].isShow">Warehouse</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td v-if="columns[0].isShow">
                <component :is="BaseCheckbox" v-model="user.checked" />
              </td>
              <td v-if="columns[1].isShow">{{ user.name }}</td>
              <td v-if="columns[2].isShow">{{ user.username }}</td>
              <td v-if="columns[3].isShow">{{ user.role }}</td>
              <td v-if="columns[4].isShow">{{ user.branch }}</td>
              <td v-if="columns[5].isShow">{{ user.warehouse }}</td>
            </tr>
          </tbody>
        </component>
        <component
          :is="BasePagination"
          v-model="page"
          :page-size="pageSize"
          :totalDocument="totalDocument"
          @update:model-value="updateData()"
        />
      </div>
    </component>
  </div>
</template>

<style scoped lang="postcss"></style>
