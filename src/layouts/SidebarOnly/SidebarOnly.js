import Sidebar from '~/components/Sidebar/Sidebar';

function SidebarOnly({ children }) {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-full flex-1 grid grid-rows-1">{children}</div>
    </div>
  );
}

export default SidebarOnly;
