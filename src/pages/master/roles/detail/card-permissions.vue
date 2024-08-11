<script setup lang="ts">
const permission = defineModel<{ [key: string]: any }>('permission', { default: {} })

const checkRows = (module: string, feature: string) => {
  permission.value[module][feature].read = permission.value[module][feature].check
  permission.value[module][feature].create = permission.value[module][feature].check
  permission.value[module][feature].update = permission.value[module][feature].check
  permission.value[module][feature].delete = permission.value[module][feature].check
}

const checkAll = (module: string, value: boolean) => {
  const modules = Object.entries(permission.value[module] ?? {})
  for (const [key, val] of modules) {
    if (typeof val === 'boolean') {
      permission.value[module][key] = value
    } else {
      const features = Object.entries(permission.value[module][key] ?? {})

      for (const [feature] of features) {
        if (features.length > 1) {
          permission.value[module][key].check = value
        }
        permission.value[module][key][feature] = value
      }
    }
  }
}
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
        <!-- Master -->
        <BaseTabPanel>
          <base-table>
            <thead>
              <tr>
                <th class="w-0"></th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody v-if="permission">
              <tr>
                <td></td>
                <td>
                  <p class="capitalize">Master Menu</p>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center"
                    v-if="permission?.master?.menu !== undefined"
                  >
                    <base-checkbox disabled v-model="permission.master.menu" class="-mr-2" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="[key] in Object.entries(permission?.master ?? {})" :key="key">
                <template v-if="key !== 'menu'">
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="Object.entries(permission?.master[key] ?? {}).length > 1"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.master[key].check"
                        class="-mr-2"
                        @change="checkRows('master', key)"
                      />
                    </div>
                  </td>
                  <td>
                    <p class="capitalize">{{ key.replaceAll('_', ' ') }}</p>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.master[key]?.read !== undefined"
                    >
                      <base-checkbox disabled v-model="permission.master[key].read" class="-mr-2" />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.master[key]?.create !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.master[key].create"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.master[key]?.update !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.master[key].update"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.master[key]?.delete !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.master[key].delete"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
        </BaseTabPanel>
        <!-- Purchasing -->
        <BaseTabPanel>
          <base-table>
            <thead>
              <tr>
                <th class="w-0"></th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody v-if="permission">
              <tr>
                <td></td>
                <td>
                  <p class="capitalize">Purchasing Menu</p>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center"
                    v-if="permission?.purchasing?.menu !== undefined"
                  >
                    <base-checkbox disabled v-model="permission.purchasing.menu" class="-mr-2" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="[key] in Object.entries(permission?.purchasing ?? {})" :key="key">
                <template v-if="key !== 'menu'">
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="Object.entries(permission?.purchasing[key] ?? {}).length > 1"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.purchasing[key].check"
                        class="-mr-2"
                        @change="checkRows('purchasing', key)"
                      />
                    </div>
                  </td>
                  <td>
                    <p class="capitalize">{{ key.replaceAll('_', ' ') }}</p>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.purchasing[key]?.read !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.purchasing[key].read"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.purchasing[key]?.create !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.purchasing[key].create"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.purchasing[key]?.update !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.purchasing[key].update"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.purchasing[key]?.delete !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.purchasing[key].delete"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
        </BaseTabPanel>
        <!-- Sales -->
        <BaseTabPanel>
          <base-table>
            <thead>
              <tr>
                <th class="w-0"></th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody v-if="permission">
              <tr>
                <td></td>
                <td>
                  <p class="capitalize">Sales Menu</p>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center"
                    v-if="permission?.sales?.menu !== undefined"
                  >
                    <base-checkbox disabled v-model="permission.sales.menu" class="-mr-2" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="[key] in Object.entries(permission?.sales ?? {})" :key="key">
                <template v-if="key !== 'menu'">
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="Object.entries(permission?.sales[key] ?? {}).length > 1"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.sales[key].check"
                        class="-mr-2"
                        @change="checkRows('sales', key)"
                      />
                    </div>
                  </td>
                  <td>
                    <p class="capitalize">{{ key.replaceAll('_', ' ') }}</p>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.sales[key]?.read !== undefined"
                    >
                      <base-checkbox disabled v-model="permission.sales[key].read" class="-mr-2" />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.sales[key]?.create !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.sales[key].create"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.sales[key]?.update !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.sales[key].update"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.sales[key]?.delete !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.sales[key].delete"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
        </BaseTabPanel>
        <!-- Finance -->
        <BaseTabPanel>
          <base-table>
            <thead>
              <tr>
                <th class="w-0"></th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody v-if="permission">
              <tr>
                <td></td>
                <td>
                  <p class="capitalize">Finance Menu</p>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center"
                    v-if="permission?.finance?.menu !== undefined"
                  >
                    <base-checkbox disabled v-model="permission.finance.menu" class="-mr-2" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="[key] in Object.entries(permission?.finance ?? {})" :key="key">
                <template v-if="key !== 'menu'">
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="Object.entries(permission?.finance[key] ?? {}).length > 1"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.finance[key].check"
                        class="-mr-2"
                        @change="checkRows('finance', key)"
                      />
                    </div>
                  </td>
                  <td>
                    <p class="capitalize">{{ key.replaceAll('_', ' ') }}</p>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.finance[key]?.read !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.finance[key].read"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.finance[key]?.create !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.finance[key].create"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.finance[key]?.update !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.finance[key].update"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.finance[key]?.delete !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.finance[key].delete"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
        </BaseTabPanel>
        <!-- Manufacture -->
        <BaseTabPanel>
          <base-table>
            <thead>
              <tr>
                <th class="w-0"></th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody v-if="permission">
              <tr>
                <td></td>
                <td>
                  <p class="capitalize">Manufacture Menu</p>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center"
                    v-if="permission?.manufacture?.menu !== undefined"
                  >
                    <base-checkbox disabled v-model="permission.manufacture.menu" class="-mr-2" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="[key] in Object.entries(permission?.manufacture ?? {})" :key="key">
                <template v-if="key !== 'menu'">
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="Object.entries(permission?.manufacture[key] ?? {}).length > 1"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.manufacture[key].check"
                        class="-mr-2"
                        @change="checkRows('manufacture', key)"
                      />
                    </div>
                  </td>
                  <td>
                    <p class="capitalize">{{ key.replaceAll('_', ' ') }}</p>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.manufacture[key]?.read !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.manufacture[key].read"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.manufacture[key]?.create !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.manufacture[key].create"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.manufacture[key]?.update !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.manufacture[key].update"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.manufacture[key]?.delete !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.manufacture[key].delete"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
        </BaseTabPanel>
        <!-- Inventory -->
        <BaseTabPanel>
          <base-table>
            <thead>
              <tr>
                <th class="w-0"></th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody v-if="permission">
              <tr>
                <td></td>
                <td>
                  <p class="capitalize">Inventory Menu</p>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center"
                    v-if="permission?.inventory?.menu !== undefined"
                  >
                    <base-checkbox disabled v-model="permission.inventory.menu" class="-mr-2" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="[key] in Object.entries(permission?.inventory ?? {})" :key="key">
                <template v-if="key !== 'menu'">
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="Object.entries(permission?.inventory[key] ?? {}).length > 1"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.inventory[key].check"
                        class="-mr-2"
                        @change="checkRows('inventory', key)"
                      />
                    </div>
                  </td>
                  <td>
                    <p class="capitalize">{{ key.replaceAll('_', ' ') }}</p>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.inventory[key]?.read !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.inventory[key].read"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.inventory[key]?.create !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.inventory[key].create"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.inventory[key]?.update !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.inventory[key].update"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.inventory[key]?.delete !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.inventory[key].delete"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
        </BaseTabPanel>
        <!-- Accounting -->
        <BaseTabPanel>
          <base-table>
            <thead>
              <tr>
                <th class="w-0"></th>
                <th>Feature</th>
                <th class="text-center">Read</th>
                <th class="text-center">Create</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody v-if="permission">
              <tr>
                <td></td>
                <td>
                  <p class="capitalize">Accounting Menu</p>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center"
                    v-if="permission?.accounting?.menu !== undefined"
                  >
                    <base-checkbox disabled v-model="permission.accounting.menu" class="-mr-2" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="[key] in Object.entries(permission?.accounting ?? {})" :key="key">
                <template v-if="key !== 'menu'">
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="Object.entries(permission?.accounting[key] ?? {}).length > 1"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.accounting[key].check"
                        class="-mr-2"
                        @change="checkRows('accounting', key)"
                      />
                    </div>
                  </td>
                  <td>
                    <p class="capitalize">{{ key.replaceAll('_', ' ') }}</p>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.accounting[key]?.read !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.accounting[key].read"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.accounting[key]?.create !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.accounting[key].create"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.accounting[key]?.update !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.accounting[key].update"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center justify-center"
                      v-if="permission?.accounting[key]?.delete !== undefined"
                    >
                      <base-checkbox
                        disabled
                        v-model="permission.accounting[key].delete"
                        class="-mr-2"
                      />
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
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
