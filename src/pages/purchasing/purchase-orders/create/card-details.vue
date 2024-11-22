<script setup lang="ts">
import AllocationChoosen from '@/pages/master/allocations/components/choosen/choosen.vue'

import type { IDetail } from '../interface'
import type { IFormError } from './form'
import { computed, ref, watch, type ComputedRef } from 'vue'

const errors = defineModel<IFormError>('errors', { required: true })
const details = defineModel<IDetail[]>('details')
const subtotal = defineModel<number>('subtotal', { default: 0 })
const discount = defineModel<number>('discount', { default: 0 })
const tax_base = defineModel<number>('tax_base', { default: 0 })
const tax_type = defineModel<'include' | 'exclude' | 'non'>('tax_type')
const tax = defineModel<number>('tax', { default: 0 })
const total = defineModel<number>('total', { default: 0 })

const isIncludeTax = ref<boolean>(false)
const isExcludeTax = ref<boolean>(false)

watch(
  () => [isIncludeTax.value, isExcludeTax.value],
  (newVal, oldVal) => {
    if (newVal[0] === true && newVal[1] === true) {
      if (newVal[0] === oldVal[0]) {
        tax_type.value = 'exclude'
        isIncludeTax.value = false
      } else if (newVal[1] === oldVal[1]) {
        tax_type.value = 'include'
        isExcludeTax.value = false
      }
    } else if (newVal[0] === false && newVal[1] === false) {
      tax_type.value = 'non'
    } else {
      tax_type.value = isIncludeTax.value ? 'include' : 'exclude'
    }
  },
  { deep: true }
)

watch(
  () => details.value,
  () => {
    calculate()
  },
  { deep: true }
)

const calculate = () => {
  details.value?.forEach((detail) => {
    detail.total = detail.quantity * (detail.price - detail.discount)
  })

  if (isIncludeTax.value) {
    tax_type.value === 'include'
  } else if (isExcludeTax.value) {
    tax_type.value === 'exclude'
  } else {
    tax_type.value === 'non'
  }
}

const computedSubtotal: ComputedRef<number> = computed({
  set() {},
  get() {
    subtotal.value =
      details.value?.reduce((acc, detail) => {
        return acc + detail.quantity * (detail.price - detail.discount)
      }, 0) ?? 0

    return subtotal.value
  }
})

const computedTaxBase: ComputedRef<number> = computed({
  set() {},
  get() {
    tax_base.value = computedSubtotal.value - discount.value
    return tax_base.value
  }
})

const computedTax: ComputedRef<number> = computed({
  set() {},
  get() {
    if (isIncludeTax.value) {
      tax.value = Math.round((computedTaxBase.value * 11) / 100 / (1 + 11 / 100))
    } else if (isExcludeTax.value) {
      tax.value = (computedTaxBase.value * 11) / 100
    } else {
      tax.value = 0
    }

    return tax.value
  }
})

const computedTotal: ComputedRef<number> = computed({
  set() {},
  get() {
    if (isExcludeTax.value) {
      total.value = computedTaxBase.value + computedTax.value
    } else {
      total.value = computedTaxBase.value
    }
    return total.value
  }
})

const clearError = (field: string) => {
  errors.value[field] = []
}
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Allocation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index" class="relative">
            <td>
              <base-button class="px-0!">{{ index + 1 }}</base-button>
            </td>
            <td>
              <base-input disabled v-model="detail.item.label" border="full"></base-input>
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="detail.quantity"
                @update:modelValue="clearError(`details.${index}.quantity`)"
                :errors="errors?.[`details.${index}.quantity`]"
              />
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="detail.price"
                @keyup="calculate()"
                @update:modelValue="clearError(`details.${index}.price`)"
                :errors="errors?.[`details.${index}.price`]"
              />
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="detail.discount"
                @update:modelValue="clearError(`details.${index}.discount`)"
                :errors="errors?.[`details.${index}.discount`]"
              />
            </td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="detail.total"
                @update:modelValue="clearError(`details.${index}.total`)"
                :errors="errors?.[`details.${index}.total`]"
              />
            </td>
            <td><allocation-choosen v-model:selected="detail.allocation" border="full" /></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Subtotal</td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="computedSubtotal"
                @update:modelValue="clearError(`subtotal`)"
                :errors="errors?.[`subtotal`]"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Discount</td>
            <td>
              <base-input-number
                border="full"
                v-model="discount"
                @update:modelValue="clearError(`discount`)"
                :errors="errors?.[`discount`]"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Tax Base</td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="computedTaxBase"
                @update:modelValue="clearError(`tax_base`)"
                :errors="errors?.[`tax_base`]"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Tax Options</td>
            <td>
              <div class="flex items-center gap-2 text-sm">
                <div class="flex items-center">
                  <base-checkbox v-model="isIncludeTax" />
                  <span>Include</span>
                </div>
                <div class="flex items-center">
                  <base-checkbox v-model="isExcludeTax" />
                  <span>Exclude</span>
                </div>
              </div>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">
              <div>Tax</div>
              <div class="text-xs font-normal">11%</div>
            </td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="computedTax"
                @update:modelValue="clearError(`tax`)"
                :errors="errors?.[`tax`]"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Total</td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="computedTotal"
                @update:modelValue="clearError(`total`)"
                :errors="errors?.[`total`]"
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
