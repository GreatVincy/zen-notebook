import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      redirect: 'editor'
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/settings',
      name: 'settings',
    },
    {
      path: '/personal',
      name: 'personal'
    }
  ]
})
