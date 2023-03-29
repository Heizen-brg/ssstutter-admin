import React, { useState, useEffect } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import { useNoti } from '~/storages/context/NotificationContext';
import { useDialog } from '~/storages/context/DialogContext';
import { callMenuService } from '~/helper/services/callServices';
const MenuDetail = (props = {}) => {
  const { id, title, url, style, attribute, order } = props;
  const [menu, setMenu] = useState(props);
  const { toggleModal, openDialog } = useDialog();
  const [loading, setLoading] = useState(false);
  const { notification } = useNoti();

  const handleChange = (prop) => (event) => {
    setMenu({ ...menu, [prop]: event.target.value });
  };

  const editMenu = async () => {
    setLoading(true);
    try {
      await callMenuService('PUT', 'UPDATE_MENU', menu);
      notification('Update menu thành công', 'success');
      toggleModal(false);
      window.location.reload(false);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };
  const deleteMenu = async () => {
    setLoading(true);
    try {
      await callMenuService('DELETE', 'DELETE_MENU', { params: id });
      notification('Xoá menu thành công', 'success');
      toggleModal(false);
      window.location.reload(false);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };
  const createMenu = async () => {
    setLoading(true);
    try {
      await callMenuService('POST', 'CREATE_MENU', menu);
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
          label="Tên Menu"
          type="text"
          fullWidth
          defaultValue={title}
          variant="standard"
          size="small"
          onChange={handleChange('title')}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Link"
          type="text"
          fullWidth
          variant="standard"
          size="small"
          defaultValue={url}
          onChange={handleChange('url')}
        />
        <div className="grid grid-cols-2 gap-10">
          <TextField
            autoFocus
            margin="dense"
            label="Style"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            defaultValue={style}
            onChange={handleChange('style')}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Thuộc tính"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            defaultValue={attribute}
            onChange={handleChange('attribute')}
          />
        </div>
      </div>
      <div className="flex items-center justify-around gap-4">
        {Object.keys(props).length ? (
          <>
            <Button variant="contained" className="w-2/3" onClick={editMenu}>
              update
            </Button>
            <Button variant="contained" color="error" className="w-1/4" onClick={deleteMenu}>
              xoá
            </Button>
          </>
        ) : (
          <>
            <Button variant="outlined" className="w-1/3" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="contained" className="w-1/3" onClick={createMenu}>
              Tạo
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuDetail;
