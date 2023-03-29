import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { ImageUpload } from '~/components';
import { useDialog } from '~/storages/context/DialogContext';
import { callBannerService } from '~/helper/services/callServices';
import { useNoti } from '~/storages/context/NotificationContext';
const BannerDetail = (props = {}) => {
  const { id, title, url, cta, ctaColor, image, mobileImage, type } = props;
  const { toggleModal, openDialog } = useDialog();
  const [loading, setLoading] = useState(false);
  const { notification } = useNoti();
  const [banner, setBanner] = useState(props);
  const [bannerType, setBannerType] = useState('main');

  useEffect(() => {
    setBannerType(banner.type);
  }, [banner.type]);

  const handleChange = (prop) => (event) => {
    setBanner({ ...banner, [prop]: event.target.value });
  };

  const bannerUpload = (data) => {
    setBanner({ ...banner, image: data.url });
  };
  const bannerMobileUpload = (data) => {
    setBanner({ ...banner, mobileImage: data.url });
  };

  const createBanner = async () => {
    setLoading(true);
    try {
      await callBannerService('POST', 'CREATE_BANNER', banner);
      notification('Tạo banner thành công', 'success');
      toggleModal(false);
      window.location.reload(false);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };
  const editBanner = async () => {
    setLoading(true);
    try {
      await callBannerService('PUT', 'UPDATE_BANNER', banner);
      notification('Update banner thành công', 'success');
      toggleModal(false);
      window.location.reload(false);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };
  const deleteBanner = async () => {
    setLoading(true);
    try {
      await callBannerService('DELETE', 'DELETE_BANNER', { params: id });
      notification('Xoá banner thành công', 'success');
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
      <TextField
        margin="dense"
        type="select"
        fullWidth
        variant="standard"
        label="Loại Banner"
        select
        defaultValue={type}
        onChange={handleChange('type')}
      >
        <MenuItem value="main"> Banner Chính </MenuItem>
        <MenuItem value="secondary"> Banner Phụ </MenuItem>
      </TextField>
      {bannerType == 'main' && (
        <div className="grid grid-cols-4 gap-5">
          <div className="w-full col-span-3">
            <p> Desktop </p> <ImageUpload ratio="landscape" url={image} imgUpload={bannerUpload} />
          </div>
          <div className="w-full col-span-1">
            <p> Mobile </p> <ImageUpload ratio="portrait" url={mobileImage} imgUpload={bannerMobileUpload} />
          </div>
        </div>
      )}
      {bannerType == 'secondary' && (
        <div className="grid gap-5">
          <div className="w-full">
            <p> Banner </p> <ImageUpload ratio="ribbon" url={image} imgUpload={bannerUpload} />
          </div>
        </div>
      )}
      <div>
        <TextField
          autoFocus
          margin="dense"
          label="Tên Banner"
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
            label="CTA"
            type="text"
            fullWidth
            variant="standard"
            size="small"
            defaultValue={cta}
            onChange={handleChange('cta')}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Color CTA"
            type="color"
            fullWidth
            variant="standard"
            size="small"
            defaultValue={ctaColor}
            onChange={handleChange('ctaColor')}
          />
        </div>
      </div>
      <div className="flex items-center justify-around gap-4">
        {Object.keys(props).length ? (
          <>
            <Button variant="contained" className="w-2/3" onClick={editBanner}>
              Xác nhân
            </Button>
            <Button variant="contained" color="error" className="w-1/4" onClick={deleteBanner}>
              Xoá
            </Button>
          </>
        ) : (
          <>
            <Button variant="outlined" className="w-1/3" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="contained" className="w-1/3" onClick={createBanner}>
              Tạo
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerDetail;
