import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useDialog } from '~/storages/context/DialogContext';
import { useNoti } from '~/storages/context/NotificationContext';
import { Loader } from '~/components';
import CampaignDetail from './components/CampaignDetail';
const Campaign = () => {
  const [campList, setCampList] = useState([]);
  const { notification } = useNoti();
  const [loading, setLoading] = useState(false);
  const { toggleModal, openDialog } = useDialog();

  const createCampaignModal = () => {
    openDialog(<CampaignDetail />, 'Tạo Campaign', 'fullscreen');
  };

  return (
    <div>
      <h1 className="uppercase text-3xl tracking-widest font-bold py-2 border-b"> Campaign </h1>
      <div>
        <div className="py-5">
          <Button variant="contained" onClick={createCampaignModal}>
            Tạo Campaign
          </Button>
        </div>
      </div>
      <div>
        <table className="w-full bg-white drop-shadow-md rounded-xl">
          <thead>
            <tr>
              <th className="uppercase text-xl py-4 px-8 text-start">Tên</th>
              <th className="uppercase text-xl py-4 px-8 text-start">Link</th>
              <th className="uppercase text-xl py-4 px-8 text-start">Ngày tháng</th>
              <th className="uppercase text-xl py-4 px-8 text-start">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 hover:bg-slate-100">
              <td className="uppercase text-lg py-4 px-8">special price</td>
              <td className="text-lg py-4 px-8">/campaign/special-price</td>
              <td className="text-lg py-4 px-8">3/2/2023</td>
              <td className="text-lg py-4 px-8">đang chạy</td>
            </tr>
            <tr>
              <td className="uppercase text-lg py-4 px-8">special price</td>
              <td className="text-lg py-4 px-8">/campaign/special-price</td>
              <td className="text-lg py-4 px-8">3/2/2023</td>
              <td className="text-lg py-4 px-8">đang chạy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaign;
