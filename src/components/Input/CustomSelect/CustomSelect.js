import { useEffect, useId, useMemo, useRef, useState } from 'react';
import CustomOption from './CustomOption';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomSelect({ name, className, title, placeholder, options = [], onChange, value = '' }) {
  let defaultSelect = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [value, options]);

  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(defaultSelect);
  const [search, setSearch] = useState(defaultSelect ? defaultSelect.title : '');
  const [displayOptions, setDisplayOptions] = useState(options);
  const ref = useRef();
  const id = useId();

  useEffect(() => {
    const handleFocusOut = () => {
      setSearch(selected ? selected.title : '');
      setShowOptions(false);
    };
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handleFocusOut();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    if (onChange) onChange({ target: { ...selectedOption, name } });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setDisplayOptions(options.filter((option) => option.title.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleFocus = (e) => {
    if (showOptions) {
      setSearch(selected ? selected.title : '');
      setShowOptions((prev) => !prev);
      e.target.blur();
    } else {
      setSearch('');
      setShowOptions((prev) => !prev);
      setDisplayOptions(options);
    }
  };

  let titleClass =
    'w-10/12 absolute whitespace-nowrap overflow-hidden transition-all left-0 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 ';

  if (title) {
    titleClass += ' -top-5  text-sm  text-gray-600 ';
    titleClass += 'peer-focus:left-0 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-600 ';
  } else {
    titleClass += 'hidden peer-placeholder-shown:block';
  }

  return (
    <div className={`${className} relative w-full`}>
      <div className="relative w-full">
        <FontAwesomeIcon className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" icon={faAngleDown} />
        <input
          className="h-10 pl-2 w-full peer border rounded pr-8 border-gray-300 cursor-pointer placeholder-transparent focus:outline-none focus:border-gray-400"
          placeholder={placeholder}
          type="text"
          id={id}
          onClick={handleFocus}
          // onFocus={handleFocus}
          onChange={handleSearch}
          value={search}
          ref={ref}
        />
        <label htmlFor={id} className={titleClass}>
          {placeholder}
        </label>
      </div>
      {showOptions && (
        <div className="absolute min-w-full max-w-[200px] max-h-[200px] overflow-y-scroll bg-white rounded shadow-md border top-12 p-3 flex flex-col z-10">
          {selected ? <CustomOption title={selected.title} selected /> : ''}
          {displayOptions
            .filter((option) => !selected || selected.value !== option.value)
            .map((option, index) => (
              <CustomOption title={option.title} key={index} onClick={() => handleSelect(option)} />
            ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
