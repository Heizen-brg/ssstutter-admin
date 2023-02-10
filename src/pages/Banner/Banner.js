import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useDialog } from '~/storages/context/DialogContext';
import { useNoti } from '~/storages/context/NotificationContext';
import BannerDetail from './components/BannerDetail';
const Banner = (props) => {
  const [listBanner, setListBanner] = useState([]);
  const { notification } = useNoti();
  const { toggleModal, openDialog } = useDialog();
  const [dataBanner, setDataBanner] = useState({
    title: '',
    link: '',
    cta: '',
    color: '',
    img: '',
  });
  const openCreateModal = () => {
    openDialog(<BannerDetail />, 'Tạo banner');
  };
  const openEditModal = () => {
    openDialog(<BannerDetail />, 'Sửa banner');
  };

  return (
    <div>
      <h1 className="uppercase text-lg py-2 border-b"> banner </h1>
      <div className="py-5">
        <div>
          <Button variant="contained" onClick={openCreateModal}>
            Tạo Banner
          </Button>
        </div>
        <div className="py-5">
          <div>
            <h2> Banner chính </h2>
            <ul className="w-full flex flex-row gap-5 p-5 bg-slate-50">
              <li className="flex flex-col w-1/6" onClick={openEditModal}>
                <span className="relative bg-[url('https://i.imgur.com/eeIdnm4.jpg')] border landscape">
                  <p className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-40 grid place-content-center text-white">
                    name
                  </p>
                </span>
              </li>
            </ul>
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
