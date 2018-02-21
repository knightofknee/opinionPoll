import Vue from 'vue'
import Router from 'vue-router'
import ManagePolls from '@/components/ManagePolls'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Poll from '@/components/Poll'
import Heading from '@/components/Heading'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/hello',
      name: 'ManagePolls',
      components: {default: ManagePolls, header: Heading},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      components: {default: Login, header: Heading}
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      components: {default: SignUp, header: Heading}
    },
    {
      path: '/poll/:pollId',
      name: 'Poll',
      components: {default: Poll, header: ''}
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser && !to.path.includes('poll')) next('hello')
  else next()
})

export default router
