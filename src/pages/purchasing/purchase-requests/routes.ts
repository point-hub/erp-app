export default {
  path: 'purchasing',
  children: [
    {
      path: 'purchase-requests',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/purchase-requests/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/purchase-requests/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/purchase-requests/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/purchase-requests/edit/index.vue')
        }
      ]
    }
  ]
}
