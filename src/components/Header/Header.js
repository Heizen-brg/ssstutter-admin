import Navbar from '~/components/Header/HeaderNav/Navbar/Navbar';
import images from '~/assets/images';

const NAV_ITEMS = [
  {
    title: 'Trang chủ',
    to: '/',
  },
  {
    title: 'Banner',
    to: '/banner',
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
    title: 'Khuyễn mãi',
    sub: [
      { title: 'Campaign', to: '/promotion/campaign' },
      { title: 'Voucher', to: '/promotion/voucher' },
    ],
  },
];

function Header() {
  return (
    <header className="w-full h-screen flex items-center justify-center px-10 border-r shadow-lg">
      <div className="h-full w-full max-w-screen-xl  ">
        <div className="grid p-4">
          <img src={images.logo} alt="SSStutter Logo" className="w-24 object-contain text-center aspect-square" />
        </div>
        <Navbar items={NAV_ITEMS} />
        {/* <div>
          <button className="text-xl">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div> */}
      </div>
    </header>
  );
}

export default Header;
