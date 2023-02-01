import { useId, useState } from 'react';

function CustomInput({ name, className = '', type, title, placeholder, onChange, value = '', disabled, custom }) {
  const [currentValue, setCurrentValue] = useState(value);
  let id = useId();

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    if (onChange) onChange({ target: { name, value: e.target.value } });
  };

  let inputClass = 'peer placeholder-transparent focus:outline-none w-full ';
  if (!custom) inputClass += 'h-10 w-full border rounded border-gray-300 pl-2 focus:border-gray-400 ';
  if (disabled) inputClass += 'text-gray-400 bg-slate-100 pointer-events-none ';
  if (className) inputClass += className;

  let titleClass =
    'absolute transition-all left-0 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 ';

  if (title) {
    titleClass +=
      'peer-focus:left-0 -top-5 peer-focus:-top-5 text-sm peer-focus:text-sm text-gray-600 peer-focus:text-gray-600';
  } else {
    titleClass += 'hidden peer-placeholder-shown:block';
  }

  return (
    <div className="relative w-full">
      <input
        id={id}
        className={inputClass}
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={handleChange}
        value={currentValue}
        disabled={disabled}
      />
      <label htmlFor={id} className={titleClass}>
        {placeholder}
      </label>
    </div>
  );
}

export default CustomInput;
