export function useFormatNumber() {
  const unformatNumber = (value: string | number) => {
    return Number(value.toString().replace(/[^0-9.-]+/g, ''))
  }

  return { unformatNumber }
}
