export default {
  path: 'master',
  children: [
    {
      path: 'setting-journals',
      children: [
        {
          path: '',
          component: () => import('@/pages/master/setting-journals/list/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: () => import('@/pages/master/setting-journals/detail/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':id/edit',
          component: () => import('@/pages/master/setting-journals/edit/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
}
