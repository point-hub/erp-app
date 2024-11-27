import { createRouter, createWebHistory } from 'vue-router'

import axios from '@/axios'
import financeBankPaymentRoutes from '@/pages/finance/bank-payments/routes'
import financeBankReportRoutes from '@/pages/finance/bank-report/routes'
import financeCashAdvanceRoutes from '@/pages/finance/cash-advances/routes'
import financeCashPaymentRoutes from '@/pages/finance/cash-payments/routes'
import financeCashReportRoutes from '@/pages/finance/cash-report/routes'
import financePaymentOrderRoutes from '@/pages/finance/payment-orders/routes'
import financeRoutes from '@/pages/finance/routes'
import inventoryAuditRoutes from '@/pages/inventory/inventory-audits/routes'
import inventoryReportRoutes from '@/pages/inventory/inventory-report/routes'
import inventoryValueReportRoutes from '@/pages/inventory/inventory-value-report/routes'
import inventoryRoutes from '@/pages/inventory/routes'
import inventoryStockCorrectionRoutes from '@/pages/inventory/stock-corrections/routes'
import manufactureFormulasRoutes from '@/pages/manufacture/formulas/routes'
import manufactureMachinesRoutes from '@/pages/manufacture/machines/routes'
import manufactureProcessesRoutes from '@/pages/manufacture/processes/routes'
import manufactureRoutes from '@/pages/manufacture/routes'
import masterAllocationGroupRoutes from '@/pages/master/allocation-groups/routes'
import masterAllocationRoutes from '@/pages/master/allocations/routes'
import masterBranchRoutes from '@/pages/master/branches/routes'
import masterChartOfAccountRoutes from '@/pages/master/chart-of-accounts/routes'
import masterCustomerGroupRoutes from '@/pages/master/customer-groups/routes'
import masterCustomerRoutes from '@/pages/master/customers/routes'
import masterItemCategoryRoutes from '@/pages/master/item-categories/routes'
import masterItemRoutes from '@/pages/master/items/routes'
import masterRoleRoutes from '@/pages/master/roles/routes'
import masterRoutes from '@/pages/master/routes'
import masterSettingJournalRoutes from '@/pages/master/setting-journals/routes'
import masterSupplierGroupRoutes from '@/pages/master/supplier-groups/routes'
import masterSupplierRoutes from '@/pages/master/suppliers/routes'
import masterUserRoutes from '@/pages/master/users/routes'
import masterWarehouseRoutes from '@/pages/master/warehouses/routes'
import purchasingDownpaymentRoutes from '@/pages/purchasing/down-payments/routes'
import purchasingInvoiceRoutes from '@/pages/purchasing/invoices/routes'
import purchasingPaymentOrderRoutes from '@/pages/purchasing/payment-orders/routes'
import purchasingPurchaseOrderRoutes from '@/pages/purchasing/purchase-orders/routes'
import purchasingPurchaseRequestRoutes from '@/pages/purchasing/purchase-requests/routes'
import purchasingReceiveOrderRoutes from '@/pages/purchasing/receive-orders/routes'
import purchasingRoutes from '@/pages/purchasing/routes'
import salesDeliveryNoteRoutes from '@/pages/sales/delivery-notes/routes'
import salesDeliveryOrderRoutes from '@/pages/sales/delivery-orders/routes'
import salesDownpaymentRoutes from '@/pages/sales/downpayments/routes'
import salesInvoiceRoutes from '@/pages/sales/invoices/routes'
import salesPaymentCollectionRoutes from '@/pages/sales/payment-collections/routes'
import salesRoutes from '@/pages/sales/routes'
import salesOrderRoutes from '@/pages/sales/sales-orders/routes'
import salesQuotationRoutes from '@/pages/sales/sales-quotations/routes'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: 'home',
          component: () => import('@/pages/home/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'menu',
          component: () => import('@/pages/menu/index.vue'),
          meta: { requiresAuth: true }
        },
        // master routes
        masterRoutes,
        masterRoleRoutes,
        masterChartOfAccountRoutes,
        masterSettingJournalRoutes,
        masterUserRoutes,
        masterBranchRoutes,
        masterWarehouseRoutes,
        masterCustomerRoutes,
        masterCustomerGroupRoutes,
        masterSupplierGroupRoutes,
        masterAllocationGroupRoutes,
        masterSupplierRoutes,
        masterAllocationRoutes,
        masterItemCategoryRoutes,
        masterItemRoutes,
        // purchasing routes
        purchasingRoutes,
        purchasingPurchaseRequestRoutes,
        purchasingPurchaseOrderRoutes,
        purchasingDownpaymentRoutes,
        purchasingReceiveOrderRoutes,
        purchasingInvoiceRoutes,
        purchasingPaymentOrderRoutes,
        // sales routes
        salesRoutes,
        salesQuotationRoutes,
        salesOrderRoutes,
        salesDownpaymentRoutes,
        salesDeliveryOrderRoutes,
        salesDeliveryNoteRoutes,
        salesInvoiceRoutes,
        salesPaymentCollectionRoutes,
        // finance routes
        financeRoutes,
        financePaymentOrderRoutes,
        financeCashAdvanceRoutes,
        financeCashPaymentRoutes,
        financeCashReportRoutes,
        financeBankPaymentRoutes,
        financeBankReportRoutes,
        // manufacture routes
        manufactureRoutes,
        manufactureMachinesRoutes,
        manufactureFormulasRoutes,
        manufactureProcessesRoutes,
        // inventories routes
        inventoryRoutes,
        inventoryAuditRoutes,
        inventoryStockCorrectionRoutes,
        inventoryReportRoutes,
        inventoryValueReportRoutes
      ]
    },
    {
      path: '/auth',
      component: () => import('@/layouts/auth.vue'),
      children: [
        {
          path: 'signin',
          component: () => import('@/pages/signin/index.vue')
        }
      ]
    },
    {
      path: '/unauthorized',
      component: () => import('@/pages/403.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/404.vue')
    }
  ]
})

const isAuthenticated = async () => {
  try {
    const authStore = useAuthStore()
    const response = await axios.post('/v1/master/auth/verify-token')
    if (response.status === 200) {
      authStore.update({
        _id: response.data._id,
        name: response.data.name,
        permission: response.data.role.permission,
        default_branch: response.data.default_branch,
        default_warehouse: response.data.default_warehouse,
        branches: response.data.branches,
        warehouses: response.data.warehouses
      })
      return true
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  // 1. check if client is authenticated
  if (to.meta.requiresAuth && !(await isAuthenticated())) {
    // err 1. redirect to signin page if not authenticated
    next(`/auth/signin?${new URLSearchParams(to.query as Record<string, string>).toString()}`)
  } else {
    next()
  }
})

export default router
