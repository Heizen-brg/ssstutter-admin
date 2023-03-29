import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { callMenuService } from '~/helper/services/callServices';
import { useDialog } from '~/storages/context/DialogContext';
import { useNoti } from '~/storages/context/NotificationContext';
import MenuDetail from './components/MenuDetail';
import { Loader } from '~/components';
const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const { notification } = useNoti();
  const [loading, setLoading] = useState(false);
  const { toggleModal, openDialog } = useDialog();

  useEffect(() => {
    getMenuList();
  }, []);

  const createMenuModal = () => {
    openDialog(<MenuDetail />, 'Thêm menu');
  };
  const editMenuModal = (data) => {
    openDialog(<MenuDetail {...data} />, 'Sửa menu');
  };

  const getMenuList = async () => {
    setLoading(true);
    try {
      const menuItem = await callMenuService('GET', 'SEARCH_MENU', {});
      setMenuList(menuItem.result);
    } catch (error) {
      notification(error.message, 'fail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}

      <h1 className="uppercase text-3xl tracking-widest font-bold py-2 border-b"> Menu </h1>
      <div>
        <div className="py-5">
          <Button variant="contained" onClick={createMenuModal}>
            Tạo Menu
          </Button>
        </div>

        <div className="w-1/3 grid gap-5 mt-24">
          {(menuList || []).map((menu, index) => (
            <div
              key={index}
              onClick={() => editMenuModal(menu)}
              className="p-4 bg-slate-50 cursor-pointer rounded-lg drop-shadow-md hover:bg-slate-200 transition-all"
            >
              <div className="flex justify-between items-center">
                <h3 className="uppercase">{menu.title}</h3>
                <p>{menu.url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
