import Vue from 'vue'
import VueRouter from 'vue-router'
import routerOptions from './routes'

Vue.use(VueRouter)

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.component}.vue`)
  };
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  document.title = `Smart Dustbin - ${to.name}`

  // Check is requires auth and unauthorized
  if (requiresAuth && (!token || token === 'null')) next('/login')
  else next()
})

export default router
