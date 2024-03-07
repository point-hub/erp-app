export const apps: IApps[] = [
  {
    name: 'ERP',
    path: '/',
    icon: 'https://assets.pointhub.net/assets/images/logo/primary/icon-rounded.png',
    menu: [
      {
        name: 'Home',
        path: '/home'
      },
      {
        name: 'Master',
        submenu: [
          { name: 'User', path: '/master/user' },
          { name: 'Branch', path: '/master/branch' },
          { name: 'Warehouse', path: '/master/warehouse' },
          { name: 'Supplier', path: '/master/supplier' },
          { name: 'Customer', path: '/master/customer' },
          { name: 'Item', path: '/master/item' },
          { name: 'Allocation', path: '/master/allocation' }
        ]
      },
      {
        name: 'Accounting',
        submenu: [
          { name: 'Chart of Account', path: '/accounting/chart-of-account' },
          { name: 'Cut Off', path: '/accounting/cut-off' }
        ]
      },
      {
        name: 'Purchase',
        submenu: [
          { name: 'Purchase Request', path: '/purchase/purchase-request' },
          { name: 'Purchase Order', path: '/purchase/purchase-order' },
          { name: 'Down Payment', path: '/purchase/down-payment' },
          { name: 'Receive Order', path: '/purchase/receive-order' },
          { name: 'Invoice', path: '/purchase/invoice' },
          { name: 'Payment Order', path: '/purchase/payment-order' }
        ]
      },
      {
        name: 'Sales',
        submenu: [
          { name: 'Sales Quotation', path: '/sales/sales-quotation' },
          { name: 'Sales Order', path: '/sales/sales-order' },
          { name: 'Down Payment', path: '/sales/down-payment' },
          { name: 'Delivery Order', path: '/sales/delivery-order' },
          { name: 'Delivery Note', path: '/sales/delivery-note' },
          { name: 'Invoice', path: '/sales/invoice' },
          { name: 'Payment Collection', path: '/sales/payment-collection' }
        ]
      },
      {
        name: 'Manufacture',
        submenu: [
          { name: 'Machine', path: '/manufacture/machine' },
          { name: 'Formula', path: '/manufacture/formula' },
          { name: 'Process', path: '/manufacture/process' }
        ]
      }
    ]
  }
]
