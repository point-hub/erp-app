export default {
  path: 'sales',
  children: [
    {
      path: '',
      component: () => import('@/pages/sales/menu/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
