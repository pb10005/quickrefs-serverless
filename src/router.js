import * as VueRouter from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router';

import index from './views/index.vue';
import login from './views/login.vue';
import signup from './views/signup.vue';
import knowledge from './views/knowledge.vue';

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
    path: '/signup',
    component: signup
  },
  {
    path: '/knowledge/:id',
    component: knowledge
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

