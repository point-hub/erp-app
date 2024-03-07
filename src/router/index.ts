import { createRouter, createWebHistory } from 'vue-router'

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
        }
      ]
    },
    {
      path: '/master',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: 'user',
          component: () => import('@/pages/master/user/list/index.vue')
        },
        {
          path: 'branch',
          component: () => import('@/pages/master/branch/list/index.vue')
        },
        {
          path: 'warehouse',
          component: () => import('@/pages/master/warehouse/list/index.vue')
        },
        {
          path: 'supplier',
          component: () => import('@/pages/master/supplier/list/index.vue')
        },
        {
          path: 'customer',
          component: () => import('@/pages/master/customer/list/index.vue')
        },
        {
          path: 'allocation',
          component: () => import('@/pages/master/allocation/list/index.vue')
        },
        {
          path: 'item',
          component: () => import('@/pages/master/item/list/index.vue')
        }
      ]
    },
    {
      path: '/purchase',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: 'purchase-request',
          component: () => import('@/pages/purchase/purchase-request/index.vue')
        },
        {
          path: 'purchase-order',
          component: () => import('@/pages/purchase/purchase-order/index.vue')
        },
        {
          path: 'down-payment',
          component: () => import('@/pages/purchase/down-payment/index.vue')
        },
        {
          path: 'receive-order',
          component: () => import('@/pages/purchase/receive-order/index.vue')
        },
        {
          path: 'invoice',
          component: () => import('@/pages/purchase/invoice/index.vue')
        },
        {
          path: 'payment-order',
          component: () => import('@/pages/purchase/payment-order/index.vue')
        }
      ]
    },
    {
      path: '/sales',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: 'sales-quotation',
          component: () => import('@/pages/sales/sales-quotation/index.vue')
        },
        {
          path: 'sales-order',
          component: () => import('@/pages/sales/sales-order/index.vue')
        },
        {
          path: 'down-payment',
          component: () => import('@/pages/sales/down-payment/index.vue')
        },
        {
          path: 'delivery-order',
          component: () => import('@/pages/sales/delivery-order/index.vue')
        },
        {
          path: 'delivery-note',
          component: () => import('@/pages/sales/delivery-note/index.vue')
        },
        {
          path: 'invoice',
          component: () => import('@/pages/sales/invoice/index.vue')
        },
        {
          path: 'payment-collection',
          component: () => import('@/pages/sales/payment-collection/index.vue')
        }
      ]
    },
    {
      path: '/accounting',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: 'chart-of-account',
          component: () => import('@/pages/accounting/chart-of-account/index.vue')
        },
        {
          path: 'cut-off',
          component: () => import('@/pages/accounting/cut-off/index.vue')
        }
      ]
    },
    {
      path: '/manufacture',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: 'formula',
          component: () => import('@/pages/manufacture/formula/list/index.vue')
        },
        {
          path: 'machine',
          component: () => import('@/pages/manufacture/machine/list/index.vue')
        },
        {
          path: 'process',
          component: () => import('@/pages/manufacture/process/list/index.vue')
        }
      ]
    }
  ]
})

export default router
