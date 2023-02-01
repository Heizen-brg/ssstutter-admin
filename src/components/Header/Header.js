import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Navbar from '~/components/Header/HeaderNav/Navbar/Navbar';
import images from '~/assets/images';

const NAV_ITEMS = [
  {
    title: 'Trang chủ',
    to: '/',
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
    title: 'Khuyễn mãi',
    sub: [
      { title: 'Campaign', to: '/promotion/campaign' },
      { title: 'Voucher', to: '/promotion/voucher' },
    ],
  },
];

function Header() {
  return (
    <header className="w-full border-b h-14 flex items-center justify-center px-10">
      <div className="h-full w-full max-w-screen-xl flex justify-between items-center">
        <div className="w-6">
          <img src={images.logo} alt="SSStutter Logo" className="object-contain aspect-square" />
        </div>
        <Navbar items={NAV_ITEMS} />
        <div>
          <button className="text-xl">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
