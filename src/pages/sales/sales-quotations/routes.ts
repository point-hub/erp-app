export default {
  path: 'sales',
  children: [
    {
      path: 'sales-quotations',
      children: [
        {
          path: '',
          component: () => import('@/pages/sales/sales-quotations/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/sales/sales-quotations/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/sales/sales-quotations/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/sales/sales-quotations/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
