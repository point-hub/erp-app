export default {
  path: 'master',
  children: [
    {
      path: 'users',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/users/list/index.vue')
        },
        {
          path: 'create',
          component: () => import('@/pages/master/users/create/index.vue')
        },
        {
          path: ':id',
          component: () => import('@/pages/master/users/detail/index.vue')
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/users/edit/index.vue')
        }
      ]
    }
  ]
}
