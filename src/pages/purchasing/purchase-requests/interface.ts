export interface IItem {
  _id: string
  label: string
  code: string
  name: string
  unit: string
}

export interface IAllocation {
  _id: string
  label: string
  code: string
  name: string
}

export interface IDetail {
  item: IItem
  quantity: number
  notes: string
  allocation: IAllocation
}

export interface IBranch {
  _id: string
  label: string
  code: string
  name: string
}

export interface IApprovalTo {
  _id: string
  label: string
  name: string
  username: string
  email: string
}

export interface IReference {
  ref_id: string
  ref_name: string
  ref_number: string
  ref_date: Date
  details: {
    uuid: string
    quantity: number
  }[]
}

export interface IPurchaseRequest {}
