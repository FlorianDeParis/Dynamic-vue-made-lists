import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/UserList'
import ArticleList from '@/components/ArticleList'
import Error404 from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/articles/:userId',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/404',
      name: 'Error404',
      component: Error404
    },
    {
      path: '*',
      name: 'Error404',
      component: Error404
    }
  ]
})
