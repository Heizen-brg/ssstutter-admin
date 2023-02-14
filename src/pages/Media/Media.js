import React, { useEffect, useState } from 'react';
import { Button, ImageList, ImageListItem, Pagination, CircularProgress } from '@mui/material';
import { callMediaService } from '~/helper/services/callServices';
import { useNoti } from '~/storages/context/NotificationContext';
import { CONFIG } from '~/helper/config/config';
import { useDialog } from '~/storages/context/DialogContext';
import MediaDetail from './components/MediaDetail';

const srcset = (image, size) => {
  return {
    src: `${CONFIG.CMS_IMAGE_URL}${image}?fit=crop&auto=format`,
    srcSet: `${CONFIG.CMS_IMAGE_URL}${image}?fit=crop&auto=format&dpr=2 2x`,
  };
};
const Media = () => {
  const [media, setMedia] = useState([]);
  const [mediaTotal, setMediaTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    skip: 0,
    limit: 10,
  });
  const { notification } = useNoti();
  const { openDialog } = useDialog();
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
    [...files].forEach(async (file) => {
      let img = await imagePreview(file);
      try {
        await callMediaService('POST', 'UPLOAD_MEDIA', { media: img });
        notification('Upload ảnh thành công', 'success');
        searchMedia();
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    });
    setLoading(true);
  };

  const searchMedia = async () => {
    setLoading(true);
    try {
      const mediaList = await callMediaService('GET', 'SEARCH_MEDIA', query);
      setMedia(mediaList.result);
      setMediaTotal(mediaList.total);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };

  const pagination = (e, page) => {
    setQuery({ ...query, skip: (page - 1) * 10 });
  };
  const editMedia = (data) => {
    openDialog(<MediaDetail url={data.url} id={data.id} />);
  };

  useEffect(() => {
    searchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.skip]);

  return (
    <div>
      <h1 className="uppercase text-lg py-2 border-b">media</h1>
      <div className="py-5 flex justify-between items-center">
        <Button variant="contained">
          <label htmlFor="media_upload" className="flex items-center gap-2">
            Upload
            <input hidden accept="image/*" onChange={uploadImage} id="media_upload" multiple type="file" />
          </label>
        </Button>

        <div className="flex flex-row justify-end p-5">
          <Pagination
            count={Math.ceil(mediaTotal / 10) || 0}
            defaultPage={1}
            onChange={(e, page) => pagination(e, page)}
            size="small"
          />
        </div>
      </div>
      {loading ? (
        <div
          className="grid place-content-center"
          style={{
            transitionDelay: loading ? '800ms' : '0ms',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <ImageList variant="masonry" cols={4}>
          {(media || []).map((item, index) => (
            <ImageListItem key={index}>
              <img
                {...srcset(item.url)}
                className="relative hover:z-10 hover:scale-110 hover:border-4 hover:border-white transition-all ease-in-out"
                loading="lazy"
                onClick={() => editMedia(item)}
                alt="media"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default Media;
