import NavItem from './NavItem';

function Nav({ items }) {
  return (
    <nav className="w-min mt-20 flex-1">
      <ul className="h-full flex flex-col items-start gap-8">
        {items.map((item, index) => (
          <NavItem item={item} key={index} />
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
