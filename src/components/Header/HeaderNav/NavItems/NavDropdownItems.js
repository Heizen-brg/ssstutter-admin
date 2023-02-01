import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button/Button';
import Dropdown from './NavDropdown';

function DropdownItems({ item }) {
  const [subItems, setSubItems] = useState(false);
  const ref = useRef();

  let hasSubItems = false;
  if (item.sub && item.sub.length) hasSubItems = true;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setSubItems(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const showSubItems = () => {
    if (!hasSubItems) return;
    setSubItems(!subItems);
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        className="justify-between w-full"
        rightIcon={hasSubItems && <FontAwesomeIcon icon={faAngleRight} />}
        leftIcon={item.icon}
        to={item.to}
        onClick={showSubItems}
        medium
        text
      >
        {item.title}
      </Button>
      {hasSubItems && subItems ? <Dropdown items={item.sub} position="right" className="bg-white" /> : ''}
    </div>
  );
}

export default DropdownItems;
