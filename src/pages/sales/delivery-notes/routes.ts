export default {
  path: 'sales',
  children: [
    {
      path: 'delivery-notes',
      children: [
        {
          path: '',
          component: () => import('@/pages/sales/delivery-notes/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/sales/delivery-notes/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/sales/delivery-notes/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/sales/delivery-notes/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
