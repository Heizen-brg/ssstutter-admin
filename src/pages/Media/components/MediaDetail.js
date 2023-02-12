import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const handleNoImage = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://cdn.ssstutter.com/products/no_image.png';
  };
  const handleErrorImage = (e) => {
    e.currentTarget.onerror = handleNoImage;
    // eslint-disable-next-line no-self-assign
    e.currentTarget.src = e.currentTarget.src;
  };

  return (
    <>
      <div>
        <img
          className="w-full"
          onError={handleErrorImage}
          src={`${CONFIG.CMS_IMAGE_URL}${url}?fit=crop&auto=format`}
          alt="media"
        />
      </div>
      <div className="flex items-center justify-between mt-4 sticky bottom-0">
        <p
          className="flex gap-4 items-center text-center cursor-copy text-lg px-4 py-2 rounded shadow-inner bg-gray-200"
          onClick={copyLink}
        >
          <span>{CONFIG.CMS_IMAGE_URL + url}</span>
          <FontAwesomeIcon icon={faCopy} />
        </p>
        <Button onClick={deleteMedia} variant="contained" color="error">
          Xoá
        </Button>
      </div>
    </>
  );
};

export default MediaDetail;
