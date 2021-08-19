import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import Error from '../pages/Error';
import Login from '../pages/Login';

export const privateRoutes = [
  { path: '/posts', component: Posts, exact: true},
  { path: '/posts/:id', component: PostIdPage, exact: true},
  { path: 'error', component: Error, exact: true},
];

export const publicRoutes = [
  {path: '/login', component: Login, exact: true},
];
