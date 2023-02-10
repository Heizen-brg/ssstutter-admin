import React, { useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { ImageUpload } from '~/components';
import { useDialog } from '~/storages/context/DialogContext';
const BannerDetail = () => {
  const { toggleModal, openDialog } = useDialog();

  const [banner, setBanner] = useState({
    title: '',
    link: '',
    cta: '',
    color: '',
    img: '',
    type: '',
  });
  const handleChange = (prop) => (event) => {
    setBanner({ ...banner, [prop]: event.target.value });
  };

  const handleConfirm = () => {
    toggleModal(false);
  };
  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <div className=" grid  gap-10 p-4  bg-white overflow-auto max-h-full ">
      <div className="grid grid-cols-4 gap-5">
        <div className="w-full col-span-3">
          <p> Desktop </p> <ImageUpload ratio="landscape" />
        </div>
        <div className="w-full col-span-1">
          <p> Mobile </p> <ImageUpload ratio="portrait" />
        </div>
      </div>
      <div>
        <TextField
          autoFocus
          margin="dense"
          label="Tên Banner"
          type="text"
          fullWidth
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
          onChange={handleChange('link')}
        />
        <div className="grid grid-cols-2 gap-10">
          <TextField
            autoFocus
            margin="dense"
            label="CTA"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            onChange={handleChange('cta')}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Color CTA"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            onChange={handleChange('color')}
          />
        </div>
        <TextField
          margin="dense"
          type="select"
          fullWidth
          variant="standard"
          select
          label="Type"
          defaultValue=""
          onChange={handleChange('type')}
        >
          <MenuItem value="main"> Banner Chính </MenuItem> <MenuItem value="secondary"> Banner Phụ </MenuItem>
        </TextField>
      </div>
      <div className="flex items-center justify-around gap-4">
        <Button variant="outlined" className="w-1/3" onClick={handleClose}>
          Huỷ
        </Button>
        <Button variant="contained" className="w-1/3" onClick={handleConfirm}>
          Tạo
        </Button>
      </div>
    </div>
  );
};

export default BannerDetail;
