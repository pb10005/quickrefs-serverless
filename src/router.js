import * as VueRouter from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router';

import index from './views/index.vue';
import login from './views/login.vue';
import knowledge_list from './views/knowledge/list.vue';
import knowledge from './views/knowledge/index.vue';
import knowledge_add from './views/knowledge/add.vue';
import profile from './views/profile.vue';
import explore from './views/explore.vue';

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/login',
    component: login
  },
  {
     path: '/knowledge/list',
     component: knowledge_list
  },
  {
    path: '/knowledge/view/:id',
    component: knowledge
  },
  {
    path: '/knowledge/add',
    component: knowledge_add
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/explore',
    component: explore
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

