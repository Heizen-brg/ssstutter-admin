import NavItem from '../NavItems/NavItems';

function Navbar({ items }) {
  return (
    <nav className="w-4/6 h-full flex justify-center">
      <ul className="flex h-full gap-x-2">
        {items.map((item, index) => (
          <NavItem item={item} key={index} />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
