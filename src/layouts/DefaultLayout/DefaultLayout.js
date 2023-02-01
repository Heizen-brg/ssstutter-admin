import Header from '~/components/Header/Header';

function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="w-full flex-1 grid grid-rows-1">{children}</div>
    </div>
  );
}

export default DefaultLayout;
