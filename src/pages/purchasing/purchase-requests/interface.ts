export interface IItem {
  lookup_from: string
  _id: string
  label: string
  code: string
  name: string
  unit: string
}

export interface IAllocation {
  lookup_from: string
  _id: string
  label: string
  code: string
  name: string
}

export interface IDetail {
  lookup_from: string
  item: IItem
  notes: string
  quantity: number
  allocation: IAllocation
}

export interface IBranch {
  lookup_from: string
  _id: string
  label: string
  code: string
  name: string
}

export interface IApprovalTo {
  lookup_from: string
  _id: string
  label: string
  name: string
  username: string
  email: string
}
