export interface IChartOfAccount {
  _id: string
  type: {
    _id: string
    name: string
  }
  category: {
    _id: string
    name: string
  }
  number: string
  name: string
  subledger: string
}
