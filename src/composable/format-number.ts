export function useFormatNumber() {
  const formatNumber = (value: string | number) => {
    return Number(value.toString().replace(/[^0-9.-]+/g, ''))
  }

  return { formatNumber }
}
