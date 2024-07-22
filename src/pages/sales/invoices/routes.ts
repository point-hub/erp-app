export default {
  path: 'sales',
  children: [
    {
      path: 'invoices',
      children: [
        {
          path: '',
          component: () => import('@/pages/sales/invoices/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/sales/invoices/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/sales/invoices/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/sales/invoices/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
