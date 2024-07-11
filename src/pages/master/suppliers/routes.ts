export default {
  path: 'master',
  children: [
    {
      path: 'suppliers',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/suppliers/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/master/suppliers/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/master/suppliers/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/suppliers/edit/index.vue')
        }
      ]
    }
  ]
}
