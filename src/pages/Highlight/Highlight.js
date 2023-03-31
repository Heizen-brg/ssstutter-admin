import React, { useState, useEffect } from 'react';
import { SelectProduct } from '~/components';
import { CONFIG } from '~/helper/config/config';
import { useNoti } from '~/storages/context/NotificationContext';
import { Loader } from '~/components';
import { Button } from '@mui/material';
import { callHighlightService } from '~/helper/services/callServices';
import { useDialog } from '~/storages/context/DialogContext';
import HighlightDetail from './components/HighlightDetail';
const Highlight = () => {
  const [menuList, setMenuList] = useState([]);
  const { notification } = useNoti();
  const [loading, setLoading] = useState(false);
  const { toggleModal, openDialog } = useDialog();
  const [newProducts, setNewProducts] = useState([]);

  const createHighLightModal = () => {
    openDialog(<HighlightDetail />, 'Tạo highlight');
  };
  return (
    <div>
      <h1 className="uppercase text-3xl tracking-widest font-bold py-2 border-b"> highlight </h1>
      <div className="py-5">
        <Button variant="contained" onClick={createHighLightModal}>
          Tạo
        </Button>
      </div>

      <div className="p-4 grid gap-8">
        <div className="p-5 bg-white rounded-md drop-shadow-md">
          <h2 className="uppercase text-sm">new collection</h2>
          <div className="mt-5">
            <SelectProduct selectProducts={setNewProducts} currentData={newProducts} />
          </div>
          <div className="grid p-4 grid-cols-12 gap-4">
            {(newProducts || []).map((product, index) => (
              <div key={index}>
                <div>
                  <div
                    className="portrait"
                    style={{ backgroundImage: `url(${CONFIG.IMAGE_BASE_URL}${product.media.featured})` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="p-5 bg-white rounded-md drop-shadow-md">
          <h2 className="uppercase text-sm">best seller</h2>
          <div className="mt-5">
            <SelectProduct currentData={products || []} />
          </div>
        </div>
        <div className="p-5 bg-white rounded-md drop-shadow-md">
          <h2 className="uppercase text-sm">style pick</h2>
          <div className="mt-5">
            <SelectProduct currentData={products || []} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Highlight;
