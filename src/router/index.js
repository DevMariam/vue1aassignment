import { createRouter, createWebHistory } from 'vue-router';
import RepositoryList from '../components/RepositoryList.vue';
import RepositoryDetail from '../components/RepositoryDetail.vue';
import NotFound from '../components/NotFound.vue';
import ErrorBoundary from '../components/ErrorBoundary.vue';


const routes = [
  {
    path: '/',
    name: 'RepositoriesList',
    component: RepositoryList,
  },
  { path: '/repository/:username/:repoName', component: RepositoryDetail },
  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/error', component: ErrorBoundary },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;