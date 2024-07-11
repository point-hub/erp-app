export default {
  path: 'finance',
  children: [
    {
      path: 'cash-advances',
      children: [
        {
          path: '',
          component: () => import('@/pages/finance/cash-advances/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/finance/cash-advances/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/finance/cash-advances/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/finance/cash-advances/edit/index.vue')
        }
      ]
    }
  ]
}
