import NavDropdownItems from './NavDropdownItems';

function NavDropdown({ items, position, className }) {
  let positionClass = 'top-16';
  if (position === 'right') positionClass = 'left-full top-0';
  if (position === 'left') positionClass = 'right-full top-0';
  return (
    <div className={` flex flex-col max-h-96 min-w-[200px] ml-4 rounded-md ${positionClass} ${className}`}>
      {items.map((item, key) => (
        <NavDropdownItems item={item} key={key} />
      ))}
    </div>
  );
}

export default NavDropdown;
