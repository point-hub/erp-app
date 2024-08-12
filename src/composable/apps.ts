import { ref, watch } from 'vue'

import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

export function useAppMenu() {
  const menus = ref<IApps[]>([
    {
      name: 'ERP',
      path: '/',
      icon: 'https://assets.pointhub.net/assets/images/logo/primary/icon-rounded.png',
      menu: [
        {
          name: 'Home',
          path: '/home'
        }
      ]
    }
  ])

  watch(
    () => authStore.permission,
    () => {
      menus.value[0].menu = [{ name: 'Home', path: '/home' }]
      menus.value[0].menu?.push(...seedMasterPermissions())
      menus.value[0].menu?.push(...seedPurchasingPermissions())
      menus.value[0].menu?.push(...seedSalesPermissions())
      menus.value[0].menu?.push(...seedFinancePermissions())
      menus.value[0].menu?.push(...seedManufacturePermissions())
      menus.value[0].menu?.push(...seedInventoryPermissions())
    },
    {
      immediate: true
    }
  )

  return { menus }
}

const seedMasterPermissions = () => {
  const menu = ref<IMenu[]>([])
  const submenu = ref<ISubmenu[]>([])

  console.log('permisson master', authStore?.permission)

  if (authStore?.permission?.master?.users?.read) {
    submenu.value?.push({ name: 'Users', path: '/master/users' })
  }
  if (authStore?.permission?.master?.roles?.read) {
    submenu.value?.push({ name: 'Roles', path: '/master/roles' })
  }
  if (authStore?.permission?.master?.branches?.read) {
    submenu.value?.push({ name: 'Branch', path: '/master/branches' })
  }
  if (authStore?.permission?.master?.warehouses?.read) {
    submenu.value?.push({ name: 'Warehouses', path: '/master/warehouses' })
  }
  if (authStore?.permission?.master?.chart_if_accounts?.read) {
    submenu.value?.push({ name: 'Chart of Accounts', path: '/master/chart-of-accounts' })
  }
  if (authStore?.permission?.master?.setting_journals?.read) {
    submenu.value?.push({ name: 'Setting Journals', path: '/master/setting-journals' })
  }
  if (authStore?.permission?.master?.suppliers?.read) {
    submenu.value?.push({ name: 'Supplier Groups', path: '/master/supplier-groups' })
    submenu.value?.push({ name: 'Supplier', path: '/master/suppliers' })
  }
  if (authStore?.permission?.master?.customers?.read) {
    submenu.value?.push({ name: 'Customer Groups', path: '/master/customer-groups' })
    submenu.value?.push({ name: 'Customer', path: '/master/customers' })
  }
  if (authStore?.permission?.master?.items?.read) {
    submenu.value?.push({ name: 'Item Categories', path: '/master/item-categories' })
    submenu.value?.push({ name: 'Item', path: '/master/items' })
  }

  if (authStore?.permission?.master?.menu) {
    menu.value.push({ name: 'Master', submenu: submenu.value })
  }

  return menu.value
}

const seedPurchasingPermissions = () => {
  const menu = ref<IMenu[]>([])
  const submenu = ref<ISubmenu[]>([])

  if (authStore?.permission?.purchasing?.purchase_requests?.read) {
    submenu.value?.push({ name: 'Purchase Requests', path: '/purchasing/purchase-requests' })
  }
  if (authStore?.permission?.purchasing?.purchase_orders?.read) {
    submenu.value?.push({ name: 'Purchase Orders', path: '/purchasing/purchase-orders' })
  }
  if (authStore?.permission?.purchasing?.down_payments?.read) {
    submenu.value?.push({ name: 'Down Payments', path: '/purchasing/down-payments' })
  }
  if (authStore?.permission?.purchasing?.receive_orders?.read) {
    submenu.value?.push({ name: 'Receive Orders', path: '/purchasing/receive-orders' })
  }
  if (authStore?.permission?.purchasing?.invoices?.read) {
    submenu.value?.push({ name: 'Invoices', path: '/purchasing/invoices' })
  }
  if (authStore?.permission?.purchasing?.payment_orders?.read) {
    submenu.value?.push({ name: 'Payment Orders', path: '/purchasing/payment-orders' })
  }

  if (authStore?.permission?.purchasing?.menu) {
    menu.value.push({ name: 'Purchasing', submenu: submenu.value })
  }

  return menu.value
}

const seedSalesPermissions = () => {
  const menu = ref<IMenu[]>([])
  const submenu = ref<ISubmenu[]>([])

  if (authStore?.permission?.sales?.sales_quotations?.read) {
    submenu.value?.push({ name: 'Sales Quotation', path: '/sales/sales-quotations' })
  }
  if (authStore?.permission?.sales?.sales_orders?.read) {
    submenu.value?.push({ name: 'Sales Orders', path: '/sales/sales-orders' })
  }
  if (authStore?.permission?.sales?.down_payments?.read) {
    submenu.value?.push({ name: 'Down Payments', path: '/sales/down-payments' })
  }
  if (authStore?.permission?.sales?.delivery_orders?.read) {
    submenu.value?.push({ name: 'Delivery Orders', path: '/sales/delivery-orders' })
  }
  if (authStore?.permission?.sales?.delivery_notes?.read) {
    submenu.value?.push({ name: 'Delivery Notes', path: '/sales/delivery-notes' })
  }
  if (authStore?.permission?.sales?.invoices?.read) {
    submenu.value?.push({ name: 'Invoices', path: '/sales/invoices' })
  }
  if (authStore?.permission?.sales?.payment_collections?.read) {
    submenu.value?.push({ name: 'Payment Collections', path: '/sales/payment-collections' })
  }

  if (authStore?.permission?.sales?.menu) {
    menu.value.push({ name: 'Sales', submenu: submenu.value })
  }

  return menu.value
}

const seedFinancePermissions = () => {
  const menu = ref<IMenu[]>([])
  const submenu = ref<ISubmenu[]>([])

  if (authStore?.permission?.finance?.payment_orders?.read) {
    submenu.value?.push({ name: 'Payment Orders', path: '/finance/payment-orders' })
  }
  if (authStore?.permission?.finance?.cash_advances?.read) {
    submenu.value?.push({ name: 'Cash Advances', path: '/finance/cash-advances' })
  }
  if (authStore?.permission?.finance?.cash_payments?.read) {
    submenu.value?.push({ name: 'Cash Payments', path: '/finance/cash-payments' })
  }
  if (authStore?.permission?.finance?.bank_payments?.read) {
    submenu.value?.push({ name: 'Bank Payments', path: '/finance/bank-payments' })
  }

  if (authStore?.permission?.finance?.menu) {
    menu.value.push({ name: 'Finance', submenu: submenu.value })
  }

  return menu.value
}

const seedManufacturePermissions = () => {
  const menu = ref<IMenu[]>([])
  const submenu = ref<ISubmenu[]>([])

  if (authStore?.permission?.manufacture?.machines?.read) {
    submenu.value?.push({ name: 'Machines', path: '/manufacture/machines' })
  }
  if (authStore?.permission?.manufacture?.processes?.read) {
    submenu.value?.push({ name: 'Processes', path: '/manufacture/processes' })
  }
  if (authStore?.permission?.manufacture?.formulas?.read) {
    submenu.value?.push({ name: 'Formulas', path: '/manufacture/formulas' })
  }

  if (authStore?.permission?.manufacture?.menu) {
    menu.value.push({ name: 'Manufacture', submenu: submenu.value })
  }

  return menu.value
}

const seedInventoryPermissions = () => {
  const menu = ref<IMenu[]>([])
  const submenu = ref<ISubmenu[]>([])

  if (authStore?.permission?.inventory?.inventory_audits?.read) {
    submenu.value?.push({ name: 'Inventory Audits', path: '/inventory/inventory-audits' })
  }
  if (authStore?.permission?.inventory?.inventory_usages?.read) {
    submenu.value?.push({ name: 'Inventory Usages', path: '/inventory/inventory-usages' })
  }
  if (authStore?.permission?.inventory?.stock_corrections?.read) {
    submenu.value?.push({ name: 'Stock Corrections', path: '/inventory/stock-corrections' })
  }

  if (authStore?.permission?.inventory?.menu) {
    menu.value.push({ name: 'Inventory', submenu: submenu.value })
  }

  return menu.value
}
