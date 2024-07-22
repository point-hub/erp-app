export default {
  path: 'sales',
  children: [
    {
      path: 'sales-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/sales/sales-orders/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/sales/sales-orders/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/sales/sales-orders/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/sales/sales-orders/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
