import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/chat',
        component: () => import('../components/Chat.vue'),
      },
      {
        path: '/broadcast',
        component: () => import('../components/Broadcast.vue'),
      },
      {
        path: '/chatRoom',
        component: () => import('../components/ChatRoom.vue'),
      },
      {
        path: '/my',
        component: () => import('../components/my/My.vue'),
      },
      {
        path: '/nearby',
        component: () => import('../components/Nearby.vue'),
      },
    ]

  },
  {
    path: '/login',
    component: () => import('../components/login/Login.vue'),
  },
  {
    path: '/follow',
    component: () => import('../components/follow/Follow.vue'),
    children: [
      {
        path: '/follow/companion',
        component: () => import('../components/follow/Companion.vue'),
      },
      {
        path: '/follow/like',
        component: () => import('../components/follow/Like.vue'),
      },
      {
        path: '/follow/group',
        component: () => import('../components/follow/Group.vue'),
      },
      {
        path: '/follow/broadcast',
        component: () => import('../components/follow/Broadcast.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

export default router
