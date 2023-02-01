import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomOption({ title, onClick, selected = false, className }) {
  return (
    <div
      className={`${className} flex gap-4 justify-between items-center p-2 rounded break-words hover:bg-gray-200 hover:text-black ${
        selected ? 'font-medium text-black' : 'font-light text-gray-400'
      } `}
      onMouseDown={onClick}
    >
      <div> {title}</div>
      {selected ? <FontAwesomeIcon icon={faCheck} /> : ''}
    </div>
  );
}

export default CustomOption;
