import VueCookie from '@point-hub/vue-cookie'
import { createRouter, createWebHistory } from 'vue-router'

import financeBankPaymentRoutes from '@/pages/finance/bank-payments/routes'
import financeBankReportRoutes from '@/pages/finance/bank-report/routes'
import financeCashAdvanceRoutes from '@/pages/finance/cash-advances/routes'
import financeCashPaymentRoutes from '@/pages/finance/cash-payments/routes'
import financeCashReportRoutes from '@/pages/finance/cash-report/routes'
import financePaymentOrderRoutes from '@/pages/finance/payment-orders/routes'
import financeRoutes from '@/pages/finance/routes'
import masterAllocationRoutes from '@/pages/master/allocations/routes'
import masterBranchRoutes from '@/pages/master/branches/routes'
import masterCustomerRoutes from '@/pages/master/customers/routes'
import masterItemRoutes from '@/pages/master/items/routes'
import masterRoutes from '@/pages/master/routes'
import masterSupplierRoutes from '@/pages/master/suppliers/routes'
import masterUserRoutes from '@/pages/master/users/routes'
import masterWarehouseRoutes from '@/pages/master/warehouses/routes'
import purchasingDownpaymentRoutes from '@/pages/purchasing/downpayments/routes'
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
import salesOrderRoutes from '@/pages/sales/payment-collections/routes'
import salesRoutes from '@/pages/sales/routes'
import salesQuotationRoutes from '@/pages/sales/sales-quotations/routes'

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
        masterUserRoutes,
        masterBranchRoutes,
        masterWarehouseRoutes,
        masterCustomerRoutes,
        masterSupplierRoutes,
        masterAllocationRoutes,
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
        financeBankReportRoutes
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
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/404.vue')
    }
  ]
})

const isAuthenticated = async () => {
  if (VueCookie.get('POINTHUB_ACCESS_TOKEN')) {
    console.log('true')
    return true
  }

  return false
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach(async (to, from, next) => {
  // 1. check if client is authenticated
  if (to.meta.requiresAuth && !(await isAuthenticated())) {
    console.log('sign')
    // err 1. redirect to signin page if not authenticated
    next(`/auth/signin?${new URLSearchParams(to.query as any).toString()}`)
  } else {
    console.log('sign2')
    next()
  }
})

export default router
