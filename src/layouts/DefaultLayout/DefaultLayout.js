import { Header, Modal, Notification } from '~/components';

function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="w-1/6">
        <Header />
      </div>
      <div className="w-full h-screen overflow-auto flex-1 grid grid-rows-1 p-8 bg-gray-100"> {children} </div>
      <div>
        <Modal />
        <Notification />
      </div>
    </div>
  );
}

export default DefaultLayout;
