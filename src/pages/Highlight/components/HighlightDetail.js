import React, { useState, useEffect } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import { useNoti } from '~/storages/context/NotificationContext';
import { useDialog } from '~/storages/context/DialogContext';
import { callHighlightService } from '~/helper/services/callServices';
const HighlightDetail = () => {
  const [highlight, setHighlight] = useState({
    id: '',
    title: '',
    type: '',
  });
  const { toggleModal, openDialog } = useDialog();
  const [loading, setLoading] = useState(false);
  const { notification } = useNoti();
  const handleChange = (prop) => (event) => {
    setHighlight({ ...highlight, [prop]: event.target.value });
  };

  const createHightLight = async () => {
    setLoading(true);
    try {
      await callHighlightService('POST', 'CREATE_HIGHLIGHT', highlight);
      notification('Tạo menu thành công', 'success');
      toggleModal(false);
      window.location.reload(false);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <div className=" grid  gap-10 p-4  bg-white overflow-auto max-h-full ">
      <div>
        <TextField
          autoFocus
          margin="dense"
          label="Tên"
          type="text"
          fullWidth
          defaultValue={highlight.title}
          variant="standard"
          size="small"
          onChange={handleChange('title')}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Type"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          defaultValue={highlight.type}
          onChange={handleChange('type')}
        />
      </div>
      <div className="flex items-center justify-around gap-4">
        <Button variant="outlined" className="w-1/3" onClick={handleClose}>
          Huỷ
        </Button>
        <Button variant="contained" className="w-1/3" onClick={createHightLight}>
          Tạo
        </Button>
      </div>
    </div>
  );
};

export default HighlightDetail;
