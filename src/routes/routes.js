import { Media, Banner, Homepage, ProductList, SignIn } from '~/pages';

export const publicRoutes = [
  { path: '/', component: Homepage },
  { path: '/banner', component: Banner },
  { path: '/media', component: Media },
  { path: '/sign-in', component: SignIn },
];

export const privateRoutes = [{ path: '/products', component: ProductList }];
