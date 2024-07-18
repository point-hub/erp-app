export default {
  path: 'purchasing',
  children: [
    {
      path: 'invoices',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/invoices/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/invoices/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/invoices/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/invoices/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
