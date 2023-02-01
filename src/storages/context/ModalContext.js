const { createContext, useState, useContext } = require('react');
const { createPortal } = require('react-dom');

const ModelContext = createContext({});

const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const showModal = (modal) => {
    if (!modals.length) {
      const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarCompensation}px`;
    }
    setModals([...modals, modal]);
  };
  const hideModal = () => {
    if (!modals.slice(0, modals.length - 1).length) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    setModals(modals.slice(0, modals.length - 1));
  };
  const hideAllModals = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    setModals([]);
  };

  const CurrentModal = modals[modals.length - 1];

  return (
    <ModelContext.Provider value={{ showModal, hideModal, hideAllModals }}>
      {children}
      {!!CurrentModal && createPortal(CurrentModal, document.getElementById('portal-modal'))}
    </ModelContext.Provider>
  );
};

const useModal = () => useContext(ModelContext);

export { ModalProvider, useModal };

export default ModelContext;
