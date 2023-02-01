import { Link } from 'react-router-dom';

function Button({
  to,
  href,
  onClick,
  primary = false,
  secondary = false,
  outline = false,
  warning = false,
  small = false,
  medium = false,
  large = false,
  text = false,
  custom = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...passProps
}) {
  let Component = 'button';
  const _props = { onClick, ...passProps };

  if (disabled) {
    Object.keys(_props).forEach((key) => {
      if (key.startsWith('on') && typeof _props[key] === 'function') delete _props[key];
    });
  }

  if (to) {
    _props.to = to;
    Component = Link;
  } else if (href) {
    _props.href = href;
    Component = 'a';
  }

  let type = '';
  if (primary) type = 'bg-blue-600 border text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700';
  else if (secondary)
    type = 'bg-green-600 border text-white border-green-600 hover:bg-green-700 hover:border-green-700';
  else if (outline) type = 'bg-transparent border border-slate-900 text-slate-900 hover:bg-slate-100';
  else if (warning) type = 'bg-red-400 border border-red-400 text-white hover:bg-red-500';
  else if (text) type = 'bg-transparent outline-none text-slate-90 hover:underline';

  let size = '';
  if (small) size = 'min-w-[88px] py-1 px-4';
  if (medium) size = 'min-w-[100px] py-2 px-4';
  else if (large) size = 'min-w-[140px] py-3 px-4';

  let defaultClass = 'flex justify-center items-center gap-1 cursor-pointer rounded select-none';
  if (custom) defaultClass = '';

  return (
    <Component
      className={`${defaultClass} ${type} ${size} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      {..._props}
    >
      {leftIcon && <span className="w-4">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="w-4">{rightIcon}</span>}
    </Component>
  );
}

export default Button;
