<script setup lang="ts">
import {
  BaseBreadcrumb,
  BaseButton,
  BaseCard,
  BaseCheckbox,
  BaseInput,
  BasePagination,
  BaseTable
} from '@point-hub/papp'
import { computed, ref } from 'vue'

const items = [
  {
    name: 'Master'
  },
  {
    name: 'Branch',
    path: '/master/branch'
  }
]

const searchAll = ref('')

// Table Data
interface BranchInterface {
  id: number
  name: string
  code: string
  checked?: boolean
}

const branches = ref<BranchInterface[]>([
  {
    id: 1,
    name: 'main',
    code: 'BR001'
  }
])

// Section Pagination
const page = ref(1)
const pageSize = ref(1)
const totalDocument = ref(1)

const updateData = () => {}

const columns = ref([
  {
    name: 'Checkbox',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Code',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Name',
    isShow: true,
    isEditable: false
  }
])

// Selecting Table Row
const selectAll = computed({
  get() {
    return isCheckedAll()
  },
  set() {
    if (isCheckedAll()) {
      branches.value.forEach((branch) => {
        branch.checked = false
      })
    } else {
      branches.value.forEach((branch) => {
        branch.checked = true
      })
    }
  }
})

const isCheckedAll = () => {
  for (const branch of branches.value) {
    if (branch.checked === undefined || branch.checked === false) {
      return false
    }
  }

  return true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Branch</h1>
    <component :is="BaseBreadcrumb" :items="items" separator="angle" v-slot="{ item }">
      <router-link v-if="item.path" :class="{ 'breadcrumb-link': item.path }" :to="item.path">
        {{ item.name }}
      </router-link>
      <span v-else>{{ item.name }}</span>
    </component>
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
        <component :is="BaseTable">
          <thead>
            <tr>
              <th v-if="columns[0].isShow" class="w-1">
                <component :is="BaseCheckbox" v-model="selectAll" />
              </th>
              <th v-if="columns[1].isShow">{{ columns[1].name }}</th>
              <th v-if="columns[2].isShow">{{ columns[2].name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(branch, index) in branches" :key="index">
              <td v-if="columns[0].isShow">
                <component :is="BaseCheckbox" v-model="branch.checked" />
              </td>
              <td v-if="columns[1].isShow">{{ branch.code }}</td>
              <td v-if="columns[2].isShow">{{ branch.name }}</td>
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
