import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { CONFIG } from '~/helper/config/config';
import { callMediaService } from '~/helper/services/callServices';
import { useNoti } from '~/storages/context/NotificationContext';
const ImageUpload = (props) => {
  const { notification } = useNoti();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ratio, url, imgUpload } = props;

  const imagePreview = (file) => {
    if (!file) return false;
    return new Promise((rs, rj) => {
      if (file.size >= 819200) {
        notification('Ảnh không được vượt quá 800kb', 'fail');
        return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        rs(reader.result);
      };
    });
  };

  const uploadImage = async (e) => {
    let { files } = e.target;
    let img = await imagePreview(files[0]);
    setLoading(true);
    try {
      const media = await callMediaService('POST', 'UPLOAD_MEDIA', { media: img });
      imgUpload(media);
      notification('Upload ảnh thành công', 'success');
      setMedia(media);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <label
        style={{
          backgroundImage: `url(${
            media.url
              ? `${CONFIG.CMS_IMAGE_URL}${media.url}`
              : url
              ? `${CONFIG.CMS_IMAGE_URL}${url}`
              : 'https://i.imgur.com/eeIdnm4.jpg'
          })`,
        }}
        className={`border ${ratio} relative`}
      >
        {loading && (
          <div className="absolute bg-black bg-opacity-10 left-0 top-0 w-full h-full grid place-content-center">
            <CircularProgress />
          </div>
        )}

        <input hidden onChange={uploadImage} accept="image/*" type="file" />
      </label>
    </>
  );
};

export default ImageUpload;
