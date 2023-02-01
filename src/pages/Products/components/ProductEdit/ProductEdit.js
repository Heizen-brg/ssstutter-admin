import { useMemo, useState } from 'react';
import ProductEditParent from './ProductEditParent';

function ProductEdit({ product }) {
  const [activeNav, setActiveNav] = useState(0);
  const editNav = useMemo(() => {
    return [
      {
        value: 'parent',
        content: 'Sản phẩm cha',
        component: <ProductEditParent product={product} />,
      },
      {
        value: 'childs',
        content: 'Sản phẩm con',
      },
      {
        value: 'media',
        content: 'Hình ảnh',
      },
    ];
  }, [product]);
  return (
    <>
      <div className="w-full h-12 grid grid-cols-3 mt-4">
        {editNav.map((nav, index) => {
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
      <div className="flex-1 overflow-scroll">{editNav[activeNav]?.component}</div>
    </>
  );
}

export default ProductEdit;
