import { createRouter, createWebHistory } from 'vue-router'
import { useFirestore } from '../stores/firestore';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/Landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin.vue'),
      meta: {
        requiresAuth: true,
        requiredRole: 'admin',
      },
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/views/Student.vue'),
      meta: {
        requiresAuth: true,
        requiredRole: 'student',
      },
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('@/views/Teacher.vue'),
      meta: {
        requiresAuth: true,
        requiredRole: 'teacher',
      },
    },
    {
      path: '/parent',
      name: 'parent',
      component: () => import('@/views/Parent.vue'),
      meta: {
        requiresAuth: true,
        requiredRole: 'parent',
      },
    },
  ]
})


router.beforeEach((to, from, next) => {
  const myFirestore =  useFirestore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (myFirestore.userAuth) {
      if (to.matched.some(record => record.meta.requiredRole)) {
        if (myFirestore.user.role === to.meta.requiredRole) {
          next()
        } else {
          next('/')
        }
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
