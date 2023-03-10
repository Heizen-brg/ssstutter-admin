function Toggle({ checked, checkedTitle = '', uncheckedTitle = '', ...props }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input {...props} type="checkbox" className="sr-only peer" checked={checked} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {checked ? checkedTitle : uncheckedTitle}
      </span>
    </label>
  );
}

export default Toggle;
