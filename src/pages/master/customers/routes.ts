export default {
  path: 'master',
  children: [
    {
      path: 'customers',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/customers/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/master/customers/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/master/customers/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/customers/edit/index.vue')
        }
      ]
    }
  ]
}
