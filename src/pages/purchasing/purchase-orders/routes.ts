export default {
  path: 'purchasing',
  children: [
    {
      path: 'purchase-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/purchase-orders/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/purchase-orders/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/purchase-orders/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/purchase-orders/edit/index.vue')
        }
      ]
    }
  ]
}
