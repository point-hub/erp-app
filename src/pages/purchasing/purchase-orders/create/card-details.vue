<script setup lang="ts">
import AllocationChoosen from '@/pages/master/allocations/components/choosen/choosen.vue'

import type { IDetail } from '../interface'
import type { IFormError } from './form'
import { ref, watch } from 'vue'
import { useFormatNumber } from '@/composable/format-number'

const { formatNumber } = useFormatNumber()
const errors = defineModel<IFormError>('errors', { required: true })
const details = defineModel<IDetail[]>('details', { required: true })
const subtotal = defineModel<number>('subtotal', { required: true, default: 0 })
const discount = defineModel<number>('discount', { required: true, default: 0 })
const tax_base = defineModel<number>('tax_base', { required: true, default: 0 })
const tax_type = defineModel<'include' | 'exclude' | 'non'>('tax_type', { required: true })
const tax = defineModel<number>('tax', { required: true, default: 0 })
const total = defineModel<number>('total', { required: true, default: 0 })

const isIncludeTax = ref<boolean>(false)
const isExcludeTax = ref<boolean>(false)

const chooseTax = (taxType: 'include' | 'exclude' | 'non') => {
  if (tax_type.value === taxType && tax_type.value !== 'non') {
    tax_type.value = 'non'
    isIncludeTax.value = false
    isExcludeTax.value = false
  } else if (taxType === 'include') {
    tax_type.value = 'include'
    isIncludeTax.value = true
    isExcludeTax.value = false
  } else if (taxType === 'exclude') {
    tax_type.value = 'exclude'
    isIncludeTax.value = false
    isExcludeTax.value = true
  }

  calculate()
}

const calculate = () => {
  details.value.forEach((detail) => {
    detail.total =
      formatNumber(detail.quantity) * (formatNumber(detail.price) - formatNumber(detail.discount))
  })

  subtotal.value = details.value.reduce((sum, detail) => {
    return sum + formatNumber(detail.total)
  }, 0)

  tax_base.value = formatNumber(subtotal.value)
  total.value = formatNumber(tax_base.value)

  // if (tax_type.value === 'include') {
  //   tax.value = (formatNumber(tax_base.value) * 11) / 100 / (1 + 11 / 100)
  //   total.value = formatNumber(tax_base.value)
  // }
  // if (tax_type.value === 'exclude') {
  //   tax.value = (formatNumber(tax_base.value) * 11) / 100
  //   total.value = formatNumber(tax_base.value) + (formatNumber(tax_base.value) * 11) / 100
  // }
  // if (tax_type.value === 'non') {
  //   tax.value = 0
  //   total.value = formatNumber(tax_base.value)
  // }
  console.log(
    tax_type.value,
    subtotal.value,
    discount.value,
    tax_base.value,
    tax.value,
    total.value
  )
}

watch(
  () => [details],
  () => {
    calculate()
  },
  { deep: true, immediate: true }
)
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
          <tr v-for="(item, index) in details" :key="index" class="relative">
            <td>
              <base-button class="px-0!">{{ index + 1 }}</base-button>
            </td>
            <td>
              <base-input disabled v-model="item.item.label" border="full"></base-input>
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="item.quantity"
                @update:modelValue="
                  () => {
                    errors[`details.${index}.quantity`] = []
                  }
                "
                :errors="errors?.[`details.${index}.quantity`]"
              />
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="item.price"
                @update:modelValue="
                  () => {
                    errors[`details.${index}.price`] = []
                  }
                "
                :errors="errors?.[`details.${index}.price`]"
              />
            </td>
            <td>
              <base-input-number
                border="full"
                v-model="item.discount"
                @update:modelValue="
                  () => {
                    errors[`details.${index}.discount`] = []
                  }
                "
                :errors="errors?.[`details.${index}.discount`]"
              />
            </td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="item.total"
                @update:modelValue="
                  () => {
                    errors[`details.${index}.total`] = []
                  }
                "
                :errors="errors?.[`details.${index}.total`]"
              />
            </td>
            <td><allocation-choosen v-model:selected="item.allocation" border="full" /></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Subtotal</td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="subtotal"
                @update:modelValue="
                  () => {
                    errors[`subtotal`] = []
                  }
                "
                :errors="errors?.[`subtotal`]"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" class="text-right font-bold uppercase">Discount</td>
            <td>
              <base-input-number
                disabled
                border="full"
                v-model="discount"
                @update:modelValue="
                  () => {
                    errors[`discount`] = []
                  }
                "
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
                v-model="tax_base"
                @update:modelValue="
                  () => {
                    errors[`tax_base`] = []
                  }
                "
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
                  <base-checkbox v-model="isIncludeTax" @click.native="chooseTax('include')" />
                  <span>Include</span>
                </div>
                <div class="flex items-center">
                  <base-checkbox v-model="isExcludeTax" @click.native="chooseTax('exclude')" />
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
                v-model="tax"
                @update:modelValue="
                  () => {
                    errors[`tax`] = []
                  }
                "
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
                v-model="total"
                @update:modelValue="
                  () => {
                    errors[`total`] = []
                  }
                "
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
