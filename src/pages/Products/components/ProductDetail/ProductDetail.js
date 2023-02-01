import { useMemo, useState } from 'react';
import ProductChilds from './ProductChilds';
import ProductParent from './ProductParent';
import ProductStocks from './ProductStocks';

function ProductDetail({ product }) {
  const [activeNav, setActiveNav] = useState(0);
  const modalNav = useMemo(() => {
    return [
      {
        value: 'parent',
        content: 'Tổng quan',
        component: <ProductParent product={product} />,
      },
      {
        value: 'childs',
        content: 'Chi tiết',
        component: <ProductChilds product={product} />,
      },
      {
        value: 'stock',
        content: 'Tồn kho',
        component: <ProductStocks product={product} />,
      },
    ];
  }, [product]);

  return (
    <>
      <div className="w-full h-12 grid grid-cols-3 mt-4">
        {modalNav.map((nav, index) => {
          return (
            <label key={index}>
              <input
                className="hidden peer"
                type="radio"
                name="nav"
                value={nav.value}
                onChange={() => setActiveNav(index)}
                checked={activeNav === index}
              />
              <div className="w-full h-full bg-zinc-200 items-center flex justify-center font-bold text-zinc-400 border-blue-400 peer-checked:bg-white peer-checked:text-black peer-checked:border-t-2 p-2">
                {nav.content}
              </div>
            </label>
          );
        })}
      </div>
      <div className="flex-1 overflow-scroll">{modalNav[activeNav]?.component}</div>
    </>
  );
}

export default ProductDetail;
