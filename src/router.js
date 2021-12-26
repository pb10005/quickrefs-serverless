import * as VueRouter from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router';

import index from './views/index.vue';
import login from './views/login.vue';
import signup from './views/signup.vue';
import knowledge from './views/knowledge.vue';
import knowledge_add from './views/knowledge_add.vue';
import profile from './views/profile.vue';

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
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

