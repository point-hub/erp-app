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
          { name: 'Role', path: '/master/roles' },
          { name: 'Branches', path: '/master/branches' },
          { name: 'Warehouses', path: '/master/warehouses' },
          { name: 'Chart of Accounts', path: '/master/chart-of-accounts' },
          // { name: 'Setting Journals', path: '/master/setting-journals' },
          { name: 'Allocation Groups', path: '/master/allocation-groups' },
          { name: 'Allocations', path: '/master/allocations' },
          { name: 'Supplier Groups', path: '/master/supplier-groups' },
          { name: 'Suppliers', path: '/master/suppliers' },
          { name: 'Customer Groups', path: '/master/customer-groups' },
          { name: 'Customers', path: '/master/customers' },
          { name: 'Item Categories', path: '/master/item-categories' }
          // { name: 'Items', path: '/master/items' }
        ]
      }
      // {
      //   name: 'Purchasing',
      //   submenu: [
      //     // { name: 'Purchase Requests', path: '/purchasing/purchase-requests' }
      //     // { name: 'Purchase Orders', path: '/purchasing/purchase-orders' },
      //     // { name: 'Downpayments', path: '/purchasing/downpayments' },
      //     // { name: 'Receive Orders', path: '/purchasing/receive-orders' },
      //     // { name: 'Invoices', path: '/purchasing/invoices' },
      //     // { name: 'Payment Orders', path: '/purchasing/payment-orders' }
      //   ]
      // }
      // {
      //   name: 'Sales',
      //   submenu: [
      //     { name: 'Sales Quotation', path: '/sales/sales-quotations' },
      //     { name: 'Sales Orders', path: '/sales/sales-orders' },
      //     { name: 'Downpayments', path: '/sales/downpayments' },
      //     { name: 'Delivery Orders', path: '/sales/delivery-orders' },
      //     { name: 'Delivery Notes', path: '/sales/delivery-notes' },
      //     { name: 'Invoices', path: '/sales/invoices' },
      //     { name: 'Payment Collections', path: '/sales/payment-collections' }
      //   ]
      // },
      // {
      //   name: 'Finance',
      //   submenu: [
      //     { name: 'Payment Orders', path: '/finance/payment-orders' },
      //     { name: 'Cash Advances', path: '/finance/cash-advances' },
      //     { name: 'Cash Payments', path: '/finance/cash-payments' },
      //     { name: 'Bank Payments', path: '/finance/bank-payments' },
      //     { name: 'Cash Report', path: '/finance/cash-report' },
      //     { name: 'Bank Report', path: '/finance/bank-report' }
      //   ]
      // },
      // {
      //   name: 'Manufacture',
      //   submenu: [
      //     { name: 'Machines', path: '/manufacture/machines' },
      //     { name: 'Processes', path: '/manufacture/processes' },
      //     { name: 'Formulas', path: '/manufacture/formulas' }
      //   ]
      // },
      // {
      //   name: 'Inventory',
      //   submenu: [
      //     { name: 'Inventory Audits', path: '/inventory/inventory-audits' },
      //     { name: 'Stock Corrections', path: '/inventory/stock-corrections' }
      //   ]
      // }
    ]
  }
]
