export default {
  path: 'purchasing',
  children: [
    {
      path: 'downpayments',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/downpayments/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/downpayments/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/downpayments/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/downpayments/edit/index.vue')
        }
      ]
    }
  ]
}
