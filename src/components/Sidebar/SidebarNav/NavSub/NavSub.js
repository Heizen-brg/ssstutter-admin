import NavSubItem from './NavSubItem';

function NavSub({ items, className }) {
  return (
    <div className={`flex flex-col  ${className}`}>
      {items.map((item, key) => (
        <NavSubItem item={item} key={key} />
      ))}
    </div>
  );
}

export default NavSub;
