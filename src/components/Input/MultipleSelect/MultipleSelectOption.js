import { useId } from 'react';

function MultipleSelectOption({ title, value, onChecked, onUnchecked, selected = false }) {
  const id = useId();
  const handleSelect = (e) => {
    if (e.target.checked) onChecked(value);
    else onUnchecked(value);
  };
  return (
    <label
      htmlFor={id}
      className={`flex gap-4 items-center p-2 rounded break-words hover:bg-gray-200 hover:text-black ${
        selected ? 'font-medium text-black' : 'font-light text-gray-400'
      } `}
    >
      <input id={id} type="checkbox" checked={selected} onChange={handleSelect} />
      <div>{title}</div>
    </label>
  );
}

export default MultipleSelectOption;
