import { Sidebar, Modal, Notification } from '~/components';

function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-full h-screen overflow-auto flex-1 p-8"> {children} </div>
      <div>
        <Modal />
        <Notification />
      </div>
    </div>
  );
}

export default DefaultLayout;
