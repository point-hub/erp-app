export default {
  path: 'purchasing',
  children: [
    {
      path: 'payment-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/payment-orders/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/payment-orders/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/payment-orders/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/payment-orders/edit/index.vue')
        }
      ]
    }
  ]
}
