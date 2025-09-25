<script setup lang="ts">
import { computed, type ComputedRef, ref, watch } from 'vue'

import type { IDetail } from '../interface'
import type { IFormError } from './form'

const errors = defineModel<IFormError>('errors', { required: true })
const details = defineModel<IDetail[]>('details')
const subtotal = defineModel<number>('subtotal', { default: 0 })
const discount = defineModel<number>('discount', { default: 0 })
const discount_type = defineModel<string>('discount_type', { default: 'value' })
const expedition_fee = defineModel<number>('expedition_fee', { default: 0 })
const tax_base = defineModel<number>('tax_base', { default: 0 })
const tax_type = defineModel<'include' | 'exclude' | 'non'>('tax_type')
const tax_percentage = defineModel<number>('tax_percentage', { default: 11 })
const tax = defineModel<number>('tax', { default: 0 })
const total = defineModel<number>('total', { default: 0 })

const isIncludeTax = ref<boolean>(false)
const isExcludeTax = ref<boolean>(false)

const changeDiscount = () => {
  if (discount_type.value === 'value') {
    discount_type.value = 'percentage'
  } else {
    discount_type.value = 'value'
  }
}

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
    calculate()
  },
  { deep: true }
)

watch(
  () => [details.value, discount_type.value],
  () => {
    calculate()
  },
  { deep: true }
)

const calculate = () => {
  console.log('calculatex ' + discount_type.value)
  if (discount_type.value === 'value') {
    details.value?.forEach((detail) => {
      detail.total = detail.quantity * (detail.price - detail.discount)
    })
  } else {
    details.value?.forEach((detail) => {
      detail.total = detail.quantity * (detail.price * (1 - detail.discount / 100));
    })
  }

  subtotal.value = computedSubtotal.value
  tax_base.value = computedTaxBase.value
  tax.value = computedTax.value
  total.value = computedTotal.value

  if (isIncludeTax.value) {
    tax_type.value = 'include'
  } else if (isExcludeTax.value) {
    tax_type.value = 'exclude'
  } else {
    tax_type.value = 'non'
  }
}

const computedSubtotal: ComputedRef<number> = computed({
  get() {
    if (discount_type.value === 'value') {
      return (
        details.value?.reduce((acc, detail) => {
          return acc + detail.quantity * (detail.price - detail.discount)
        }, 0) ?? 0
      )
    } else {
      return (
        details.value?.reduce((acc, detail) => {
          return acc + detail.quantity * (detail.price * (1 - detail.discount / 100));
        }, 0) ?? 0
      )
    }
  },
  set() { }
})

const computedTaxBase: ComputedRef<number> = computed({
  get() {
    if (discount_type.value === 'value') {
      return computedSubtotal.value - discount.value
    } else {
      return computedSubtotal.value * (1 - discount.value / 100)
    }
  },
  set() { }
})

const computedTax: ComputedRef<number> = computed({
  get() {
    if (isIncludeTax.value) {
      return Math.round((computedTaxBase.value * tax_percentage.value) / 100 / (1 + tax_percentage.value / 100))
    } else if (isExcludeTax.value) {
      return Math.round((computedTaxBase.value * tax_percentage.value) / 100)
    } else {
      return 0
    }
  },
  set() { }
})

const computedTotal: ComputedRef<number> = computed({
  get() {
    if (isExcludeTax.value) {
      return computedTaxBase.value + computedTax.value + expedition_fee.value
    } else {
      return computedTaxBase.value + expedition_fee.value
    }
  },
  set() { }
})
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1">#</th>
            <th>Purchase Received</th>
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
              <base-input disabled v-model="detail.receive_order.form_number" border="full"></base-input>
            </td>
            <td>
              <base-input disabled v-model="detail.item.label" border="full"></base-input>
            </td>
            <td>
              <base-input-number disabled border="full" v-model="detail.quantity" :decimalLength="2"
                :errors="errors?.[`details.${index}.quantity`]" />
            </td>
            <td>
              <base-input-number border="full" v-model="detail.price" @keyup="calculate()" :decimalLength="2"
                :errors="errors?.[`details.${index}.price`]" />
            </td>
            <td>
              <base-input-number border="full" v-model="detail.discount" :decimalLength="2"
                :errors="errors?.[`details.${index}.discount`]">
                <template #suffix>
                  <base-button v-if="discount_type === 'value'" @click="changeDiscount">RP</base-button>
                  <base-button v-if="discount_type === 'percentage'" @click="changeDiscount">%</base-button>
                </template>
              </base-input-number>
            </td>
            <td>
              <base-input-number disabled border="full" v-model="detail.total" :decimalLength="2"
                :errors="errors?.[`details.${index}.total`]" />
            </td>
            <td>
              <base-input disabled v-model="detail.allocation.label" border="full" />
            </td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Subtotal</td>
            <td>
              <base-input-number disabled border="full" v-model="computedSubtotal" :decimalLength="2"
                :errors="errors?.[`subtotal`]" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Discount</td>
            <td>
              <base-input-number border="full" v-model="discount" :decimalLength="2" :errors="errors?.[`discount`]">
                <template #suffix>
                  <base-button v-if="discount_type === 'value'" @click="changeDiscount">RP</base-button>
                  <base-button v-if="discount_type === 'percentage'" @click="changeDiscount">%</base-button>
                </template>
              </base-input-number>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Tax Base</td>
            <td>
              <base-input-number disabled border="full" v-model="computedTaxBase" :decimalLength="2"
                :errors="errors?.[`tax_base`]" />
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
              <div>Tax Percentage</div>
            </td>
            <td>
              <base-input-number :disabled="tax_type === 'non'" border="full" v-model="tax_percentage"
                :decimalLength="2" :errors="errors?.[`tax`]">
                <template #suffix>
                  <base-button>%</base-button>
                </template>
              </base-input-number>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">
              <div>Tax</div>
            </td>
            <td>
              <base-input-number disabled border="full" v-model="computedTax" :decimalLength="2"
                :errors="errors?.[`tax`]" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Expedition Fee</td>
            <td>
              <base-input-number border="full" v-model="expedition_fee" :decimalLength="2"
                :errors="errors?.[`expedition_fee`]" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Total</td>
            <td>
              <base-input-number disabled border="full" v-model="computedTotal" :decimalLength="2"
                :errors="errors?.[`total`]" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
