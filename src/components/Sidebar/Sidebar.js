import Navbar from '~/components/Sidebar/SidebarNav/Nav/Nav';
import images from '~/assets/images';
import SidebarFooter from './SidebarFooter/SidebarFooter';

const NAV_ITEMS = [
  {
    title: 'Trang chủ',
    to: '/',
  },
  {
    title: 'Menu',
    to: '/menu',
  },
  {
    title: 'Banner',
    to: '/banner',
  },
  {
    title: 'Highlight Product',
    to: '/highlight',
  },
  {
    title: 'Campaign',
    to: '/campaign',
  },
  {
    title: 'Media',
    to: '/media',
  },
  {
    title: 'Sản phẩm',
    sub: [{ title: 'Danh sách sản phẩm', to: '/products' }],
  },
  {
    title: 'Kho hàng',
    sub: [{ title: 'Tồn kho', to: '/warehouse/stocks' }],
  },
  {
    title: 'Khuyến mãi',
    sub: [
      { title: 'Campaign', to: '/promotion/campaign' },
      { title: 'Voucher', to: '/promotion/voucher' },
    ],
  },
];

function Sidebar() {
  return (
    <header className="w-full h-screen flex items-center justify-center px-6 border-r shadow-lg">
      <div className="h-full w-full flex flex-col">
        <div className="grid justify-center p-4">
          <img src={images.logo} alt="SSStutter Logo" className="w-16 object-contain aspect-square" />
        </div>
        <Navbar items={NAV_ITEMS} />
        <SidebarFooter />
      </div>
    </header>
  );
}

export default Sidebar;
