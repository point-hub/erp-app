export default {
  path: 'purchasing',
  children: [
    {
      path: 'receive-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/receive-orders/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/receive-orders/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/receive-orders/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/receive-orders/edit/index.vue')
        }
      ]
    }
  ]
}
