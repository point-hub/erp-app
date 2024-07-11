export default {
  path: 'finance',
  children: [
    {
      path: 'bank-payments',
      children: [
        {
          path: '',
          component: () => import('@/pages/finance/bank-payments/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/finance/bank-payments/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/finance/bank-payments/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/finance/bank-payments/edit/index.vue')
        }
      ]
    }
  ]
}
