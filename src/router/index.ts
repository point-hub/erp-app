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
          component: () => import('@/pages/home/index.vue')
        },
        {
          path: 'menu',
          component: () => import('@/pages/menu/index.vue')
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
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/404.vue')
    }
  ]
})

export default router
