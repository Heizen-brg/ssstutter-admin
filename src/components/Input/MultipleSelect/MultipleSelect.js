import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Option from './MultipleSelectOption';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MultipleSelect({ name, title, options = [], onChange, placeholder, className = '' }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [displayOptions, setDisplayOptions] = useState(options);

  const ref = useRef();
  const id = useId();

  useEffect(() => {
    const handleFocusOut = () => {
      setSearch(selected && selected.length ? `Đã chọn ${selected.length}` : '');
      setShowOptions(false);
    };
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handleFocusOut();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const selectedAll = useMemo(() => {
    return options.every((option) => selected.includes(option.value));
  }, [options, selected]);

  const handleChecked = (value) => {
    const selectValues = [...selected, value];
    setSelected(selectValues);
    setSearch(selectValues.length ? `Đã chọn ${selectValues.length}` : '');
    if (onChange) onChange({ target: { name, value: selectValues } });
  };

  const handleUnchecked = (value) => {
    const selectValues = selected.filter((select) => select !== value);
    setSelected(selectValues);
    setSearch(selectValues.length ? `Đã chọn ${selectValues.length}` : '');
    if (onChange) onChange({ target: { name, value: selectValues } });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setDisplayOptions(options.filter((option) => option.title.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleSelectAll = (e) => {
    let selectValues = [];
    if (e.target.checked) selectValues = options.map((option) => option.value);
    setSelected(selectValues);
    setSearch(selectValues.length ? `Đã chọn ${selectValues.length}` : '');
    if (onChange) onChange({ target: { name, value: selectValues } });
  };

  const handleFocus = (e) => {
    if (showOptions) {
      setSearch(selected && selected.length ? `Đã chọn ${selected.length}` : '');
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
    <div className={`${className} relative`} ref={ref}>
      <div className="relative">
        <FontAwesomeIcon className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" icon={faAngleDown} />
        <input
          className="h-10 w-full pl-2 peer border rounded pr-8 border-gray-300 text-gray-900 cursor-pointer placeholder-transparent focus:outline-none focus:border-gray-400"
          placeholder={placeholder}
          type="text"
          id={id}
          onClick={handleFocus}
          onChange={handleSearch}
          value={search}
        />
        <label htmlFor={id} className={titleClass}>
          {placeholder}
        </label>
      </div>
      {showOptions && (
        <div className="absolute min-w-full max-w-[200px] max-h-[200px] overflow-y-scroll bg-white rounded shadow-md border top-12 p-3 flex flex-col z-10">
          {
            <label
              htmlFor={`${id}-select-all`}
              className={`flex gap-4 items-center p-2 rounded break-words hover:bg-gray-200 hover:text-black ${
                selectedAll ? 'font-medium text-black' : 'font-light text-gray-400'
              } `}
            >
              <input id={`${id}-select-all`} type="checkbox" checked={selectedAll} onChange={handleSelectAll} />
              <div>Tất cả</div>
            </label>
          }
          {displayOptions.map((option, index) => (
            <Option
              title={option.title}
              value={option.value}
              key={index}
              selected={selected.includes(option.value)}
              onChecked={handleChecked}
              onUnchecked={handleUnchecked}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MultipleSelect;
