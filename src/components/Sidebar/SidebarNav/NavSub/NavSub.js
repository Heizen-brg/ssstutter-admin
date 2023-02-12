import NavSubItem from './NavSubItem';

function NavSub({ items, className }) {
  return (
    <div className={`flex flex-col max-h-96 ${className}`}>
      {items.map((item, key) => (
        <NavSubItem item={item} key={key} />
      ))}
    </div>
  );
}

export default NavSub;
