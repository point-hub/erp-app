import { numberFormat } from '@point-hub/js-utils'

export function useFormatNumber() {
  const unformatNumber = (value: string | number) => {
    return Number(value.toString().replace(/[^0-9.-]+/g, ''))
  }

  const formatNumber = (value: string | number) => {
    return numberFormat(value, { maximumFractionDigits: 2 })
  }

  const formatAccounting = (value: string | number) => {
    return numberFormat(value, { accounting: true, maximumFractionDigits: 2 })
  }

  return { unformatNumber, formatNumber, formatAccounting }
}
