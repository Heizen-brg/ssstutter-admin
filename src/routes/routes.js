import { Media, Banner, Homepage, ProductList, SignIn, Menu, Campaign, Highlight } from '~/pages';
import Voucher from '~/pages/Promotion/Voucher/Voucher';
import Stock from '~/pages/Warehouse/Stock/Stock';

export const publicRoutes = [
  { path: '/', component: Homepage },
  { path: '/menu', component: Menu },
  { path: '/banner', component: Banner },
  { path: '/media', component: Media },
  { path: '/highlight', component: Highlight },
  { path: '/campaign', component: Campaign },
  { path: '/sign-in', component: SignIn },
];

export const privateRoutes = [
  { path: '/products', component: ProductList },
  { path: '/warehouse/stocks', component: Stock },
  { path: '/promotion/campaign', component: Campaign },
  { path: '/promotion/voucher', component: Voucher },
];
