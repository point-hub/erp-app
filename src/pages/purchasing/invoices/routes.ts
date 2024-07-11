export default {
  path: 'purchasing',
  children: [
    {
      path: 'invoices',
      children: [
        {
          path: '',
          component: () => import('@/pages/purchasing/invoices/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/purchasing/invoices/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/purchasing/invoices/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/purchasing/invoices/edit/index.vue')
        }
      ]
    }
  ]
}
