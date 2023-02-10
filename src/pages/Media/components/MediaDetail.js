import { Button } from '@mui/material';
import React from 'react';
import { CONFIG } from '~/helper/config/config';
import { callMediaService } from '~/helper/services/callServices';
import { useDialog } from '~/storages/context/DialogContext';
import { useNoti } from '~/storages/context/NotificationContext';
const MediaDetail = (props) => {
  const { url, id } = props;
  const { notification } = useNoti();
  const { toggleModal } = useDialog();
  const copyLink = () => {
    notification('Đã copy link', 'success');
    navigator.clipboard.writeText(`${CONFIG.CMS_IMAGE_URL}${url}`);
  };

  const deleteMedia = async () => {
    try {
      await callMediaService('DELETE', 'DELETE_MEDIA', { params: id });
      notification('Xoá ảnh thành công', 'success');
      toggleModal(false);
      window.location.reload(false);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      return;
    }
  };
  return (
    <div>
      <img className="w-full" src={`${CONFIG.CMS_IMAGE_URL}${url}?fit=crop&auto=format`} />
      <div className="flex items-center justify-between mt-4">
        <p className="text-center text-lg px-4 py-2 rounded shadow-inner bg-gray-200" onClick={copyLink}>
          {CONFIG.CMS_IMAGE_URL}
          {url}
        </p>
        <Button onClick={deleteMedia} variant="contained" color="error">
          Xoá
        </Button>
      </div>
    </div>
  );
};

export default MediaDetail;
