import { useMemo, useState } from 'react';
import ProductEditChilds from './ProductEditChild';
import ProductEditMedia from './ProductEditMedia';
import ProductEditParent from './ProductEditParent';

function ProductEdit({ product, cancelEdit }) {
  const [activeNav, setActiveNav] = useState(0);
  const editNav = useMemo(() => {
    return [
      {
        value: 'parent',
        content: 'Sản phẩm cha',
        component: <ProductEditParent product={product} cancelEdit={cancelEdit} />,
      },
      {
        value: 'childs',
        content: 'Sản phẩm con',
        component: <ProductEditChilds product={product} cancelEdit={cancelEdit} />,
      },
      {
        value: 'media',
        content: 'Hình ảnh',
        component: <ProductEditMedia product={product} cancelEdit={cancelEdit} />,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {editNav[activeNav]?.component}
    </>
  );
}

export default ProductEdit;
