import NavItem from '../NavItems/NavItems';

function Navbar({ items }) {
  return (
    <nav className="w-full mt-28 ">
      <ul className=" h-full flex flex-col gap-8">
        {items.map((item, index) => (
          <NavItem item={item} key={index} />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
