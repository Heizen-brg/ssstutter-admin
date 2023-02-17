import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { CONFIG } from '~/helper/config/config';
import { callBannerService } from '~/helper/services/callServices';
import { useDialog } from '~/storages/context/DialogContext';
import { useNoti } from '~/storages/context/NotificationContext';
import BannerDetail from './components/BannerDetail';
const Banner = (props) => {
  const [listBanner, setListBanner] = useState([]);
  const { notification } = useNoti();
  const [loading, setLoading] = useState(false);
  const { toggleModal, openDialog } = useDialog();
  useEffect(() => {
    getBannerList();
  }, []);

  const openCreateModal = () => {
    openDialog(<BannerDetail />, 'Tạo banner');
  };
  const openEditModal = (data) => {
    openDialog(<BannerDetail {...data} />, 'Sửa banner');
  };

  const getBannerList = async () => {
    setLoading(true);
    try {
      const bannerList = await callBannerService('GET', 'SEARCH_BANNER', {});
      setListBanner(bannerList.result);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="uppercase text-lg py-2 border-b"> banner </h1>
      <div>
        <div className="py-5">
          <Button variant="contained" onClick={openCreateModal}>
            Tạo Banner
          </Button>
        </div>
        <div className="p-8 bg-white">
          <div>
            <h2> Banner chính </h2>
            <div className="w-full flex flex-row gap-5 p-5 bg-slate-50">
              {(listBanner || []).map((banner, index) => (
                <div key={index} className="flex flex-col w-1/6" onClick={() => openEditModal(banner)}>
                  <span
                    style={{ backgroundImage: `url(${CONFIG.CMS_IMAGE_URL}${banner.image})` }}
                    className={`relative border landscape`}
                  >
                    <p className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-40 grid place-content-center text-white">
                      {banner.title}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2> Banner phụ </h2>
            <ul className="w-full flex flex-row gap-5 p-5 bg-slate-50">
              <li className="flex flex-col w-1/5">
                <span className="relative bg-[url('https://i.imgur.com/eeIdnm4.jpg')] border ribbon">
                  <p className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-40 grid place-content-center text-white">
                    name
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
