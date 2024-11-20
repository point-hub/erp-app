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

export interface ISupplier {
  _id: string
  label: string
  code: string
  name: string
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

export interface IPurchaseRequest {
  _id: string
  label: string
  form_number: string
  details: IDetail[]
  references: IReference[]
}

export interface IDetail {
  item: IItem
  notes: string
  quantity: number
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
