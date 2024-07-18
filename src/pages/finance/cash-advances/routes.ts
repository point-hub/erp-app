export default {
  path: 'finance',
  children: [
    {
      path: 'cash-advances',
      children: [
        {
          path: '',
          component: () => import('@/pages/finance/cash-advances/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/finance/cash-advances/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/finance/cash-advances/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/finance/cash-advances/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
