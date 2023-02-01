import NavDropdownItems from './NavDropdownItems';

function NavDropdown({ items, position, className }) {
  let positionClass = 'top-16';
  if (position === 'right') positionClass = 'left-full top-0';
  if (position === 'left') positionClass = 'right-full top-0';
  return (
    <div
      className={`absolute flex flex-col max-h-96 min-w-[200px] border border-solid rounded-md ${positionClass} shadow-md z-10 ${className}`}
    >
      {items.map((item, key) => (
        <NavDropdownItems item={item} key={key} />
      ))}
    </div>
  );
}

export default NavDropdown;
