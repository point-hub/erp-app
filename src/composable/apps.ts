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
          { name: 'Users', path: '/master/users' },
          { name: 'Branches', path: '/master/branches' },
          { name: 'Warehouses', path: '/master/warehouses' },
          { name: 'Allocations', path: '/master/allocations' },
          { name: 'Items', path: '/master/items' },
          { name: 'Customers', path: '/master/customers' },
          { name: 'Suppliers', path: '/master/suppliers' }
        ]
      },
      {
        name: 'Purchasing',
        submenu: [
          { name: 'Purchase Requests', path: '/purchasing/purchase-requests' },
          { name: 'Purchase Orders', path: '/purchasing/purchase-orders' },
          { name: 'Downpayments', path: '/purchasing/downpayments' },
          { name: 'Receive Orders', path: '/purchasing/receive-orders' },
          { name: 'Invoices', path: '/purchasing/invoices' },
          { name: 'Payment Orders', path: '/purchasing/payment-orders' }
        ]
      },
      {
        name: 'Finance',
        submenu: [
          { name: 'Payment Orders', path: '/finance/payment-orders' },
          { name: 'Cash Advances', path: '/finance/cash-advances' },
          { name: 'Cash Payments', path: '/finance/cash-payments' },
          { name: 'Bank Payments', path: '/finance/bank-payments' },
          { name: 'Cash Report', path: '/finance/cash-report' },
          { name: 'Bank Report', path: '/finance/bank-report' }
        ]
      }
    ]
  }
]
