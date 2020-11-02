import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/chat',
        component: () => import('../components/chat/Chat.vue'),
      },
      {
        path: '/broadcast',
        component: () => import('../components/broadcast/Broadcast.vue'),
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
    path: '/logout',
    component: () => import('../components/login/Logout.vue'),
  },
  {
    path: '/chatobject/:id',
    component: () => import('../components/chat/ChatObject.vue'),
  },
  {
    path: '/groupChat/:id',
    component: () => import('../components/broadcast/GroupChat.vue'),
  },
  {
    path: '/search',
    component: () => import('../components/Search.vue'),
  },
  {
    path: '/groupsearch',
    component: () => import('../components/broadcast/GroupSearch.vue'),
  },
  {
    path: '/groupInformation',
    component: () => import('../components/broadcast/GroupInformation.vue'),
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
