import React, { useContext, createContext, useState } from 'react';

const DialogContext = createContext({});

const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [title, setTitle] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const toggleModal = (data) => {
    setOpen(data);
  };

  const openDialog = (modal, title, size = '') => {
    setOpen(true);
    setModal(modal);
    setTitle(title);
    size == 'fullscreen' ? setFullScreen(true) : setFullScreen(false);
  };

  const full = () => {
    setFullScreen(true);
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        modal,
        openDialog,
        title,
        fullScreen,
        full,
        toggleModal,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
const useDialog = () => useContext(DialogContext);

export { useDialog, DialogProvider };
