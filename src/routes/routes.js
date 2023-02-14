import { Media, Banner, Homepage, ProductList, SignIn } from '~/pages';
import Campaign from '~/pages/Promotion/Campaign/Campaign';
import Voucher from '~/pages/Promotion/Voucher/Voucher';
import Stock from '~/pages/Warehouse/Stock/Stock';

export const publicRoutes = [
  { path: '/', component: Homepage },
  { path: '/banner', component: Banner },
  { path: '/media', component: Media },
  { path: '/sign-in', component: SignIn },
];

export const privateRoutes = [
  { path: '/products', component: ProductList },
  { path: '/warehouse/stocks', component: Stock },
  { path: '/promotion/campaign', component: Campaign },
  { path: '/promotion/voucher', component: Voucher },
];
