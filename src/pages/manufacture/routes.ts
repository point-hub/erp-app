export default {
  path: 'manufacture',
  children: [
    {
      path: '',
      component: () => import('@/pages/manufacture/menu/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
