import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDialog } from '~/storages/context/DialogContext';
const Modal = () => {
  const { open, toggleModal, modal, title, fullScreen } = useDialog();

  return (
    <>
      <Dialog open={open} onClose={() => toggleModal(false)} fullScreen={fullScreen} maxWidth="sm" fullWidth={true}>
        {title && (
          <DialogTitle className="uppercase py-2 border-b flex items-center justify-between">
            <p> {title} </p>
          </DialogTitle>
        )}
        <DialogContent> {modal} </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
