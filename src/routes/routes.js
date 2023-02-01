import Homepage from '~/pages/Homepage/Homepage';
import ProductList from '~/pages/Products/ProductList';
import SignIn from '~/pages/SignIn/SignIn';

export const publicRoutes = [
  { path: '/', component: Homepage },
  { path: '/sign-in', component: SignIn },
];

export const privateRoutes = [{ path: '/products', component: ProductList }];
