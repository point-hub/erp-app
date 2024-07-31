export default {
  path: 'inventory',
  children: [
    {
      path: '',
      component: () => import('@/pages/inventory/menu/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
