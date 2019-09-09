import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserList from '@/components/UserList'
import Error404 from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/404',
      name: 'Error404',
      component: Error404
    }
  ]
})
