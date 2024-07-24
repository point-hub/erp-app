export default {
  path: 'manufacture',
  children: [
    {
      path: 'machines',
      component: () => import('@/pages/manufacture/machines/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
