export default {
  path: 'sales',
  children: [
    {
      path: 'delivery-orders',
      children: [
        {
          path: '',
          component: () => import('@/pages/sales/delivery-orders/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'create',
          component: () => import('@/pages/sales/delivery-orders/create/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/sales/delivery-orders/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/sales/delivery-orders/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
