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
          path: 'create-1',
          component: () => import('@/pages/purchasing/invoices/create-1/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create-2/:id',
          component: () => import('@/pages/purchasing/invoices/create-2/index.vue'),
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
