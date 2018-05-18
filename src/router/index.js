import Vue from 'vue'
import Router from 'vue-router'
import Notebook from '@/components/notebook/Notebook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      redirect: 'notebook'
    },
    {
      path: '/notebook',
      name: 'notebook',
      component: Notebook,
      props: {
        initialTitle: "未命名笔记"
      }
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
