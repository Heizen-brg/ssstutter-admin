import React, { useState, useEffect } from 'react';
import { SelectProduct } from '~/components';
import { useNoti } from '~/storages/context/NotificationContext';
const Highlight = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <h1 className="uppercase text-3xl tracking-widest font-bold py-2 border-b"> highlight </h1>
      <div className="p-4 grid gap-8">
        <div className="p-5 bg-white rounded-md drop-shadow-md">
          <h2 className="uppercase text-sm">new collection</h2>
          <div className="mt-5">
            <SelectProduct currentData={products || []} />
          </div>
        </div>
        <div className="p-5 bg-white rounded-md drop-shadow-md">
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
        </div>
      </div>
    </div>
  );
};

export default Highlight;
