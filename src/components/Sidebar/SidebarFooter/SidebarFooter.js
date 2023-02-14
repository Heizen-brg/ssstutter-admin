import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SidebarFooter() {
  return (
    <div className="border-t py-8">
      <div className="px-4 flex gap-6 items-center whitespace-nowrap cursor-pointer text-red-400 hover:text-red-500">
        <div className="font-bold text-xl uppercase ">Đăng xuất</div>
        <FontAwesomeIcon className="font-bold text-2xl" icon={faRightFromBracket} />
      </div>
    </div>
  );
}

export default SidebarFooter;
