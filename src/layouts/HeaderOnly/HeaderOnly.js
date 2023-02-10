import Header from '~/components/Header/Header';

function HeaderOnly({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-1/4">
        <Header />
      </div>
      <div className="w-full flex-1 grid grid-rows-1">{children}</div>
    </div>
  );
}

export default HeaderOnly;
