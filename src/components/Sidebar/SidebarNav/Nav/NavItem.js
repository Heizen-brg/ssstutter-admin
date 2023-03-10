import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button/Button';
import NavSub from '../NavSub/NavSub';

function NavItem({ item }) {
  const [subItems, setSubItems] = useState(false);
  const ref = useRef();

  let hasSubItems = false;
  if (item.sub && item.sub.length) hasSubItems = true;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (subItems && ref.current && !ref.current.contains(e.target)) setSubItems(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subItems]);

  const showSubItems = () => {
    if (!hasSubItems) return;
    setSubItems(!subItems);
  };

  return (
    <li
      className="relative w-full after:absolute after:transition-all after:duration-300 after:hover:w-full after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0"
      ref={ref}
    >
      <Button
        className="relative font-bold text-xl uppercase flex gap-6 w-full justify-between whitespace-nowrap"
        rightIcon={hasSubItems && <FontAwesomeIcon icon={faCaretDown} />}
        to={item.to}
        onClick={showSubItems}
        medium
      >
        {item.title}
      </Button>
      {hasSubItems && subItems ? <NavSub className="bg-white" items={item.sub} /> : ''}
    </li>
  );
}

export default NavItem;
