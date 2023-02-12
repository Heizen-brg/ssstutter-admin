import { useState } from 'react';
import Button from '~/components/Button/Button';
import Toggle from '~/components/Button/Toggle';

function ProductEditParent({ product, cancelEdit }) {
  const [updateData, setUpdateData] = useState({
    id: product.id,
    isActive: product.isActive,
    preOrder: product.preOrder,
  });

  const handleUpdate = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <div className="flex-1 overflow-scroll">
        <div className="grid grid-cols-3 gap-12 p-4 max-lg:gap-2 max-md:grid-cols-2 max-md:gap-12 max-sm:grid-cols-1">
          <div className="flex flex-col gap-2 max-md:row-span-2 max-sm:row-span-1">
            <img
              className="aspect-[3/4] object-cover"
              src={`https://cdn.ssstutter.com/products/${product?.media?.featured || 'no_image.png'}`}
              alt="img"
            />
          </div>
          <div className="info flex flex-col gap-2">
            <div className="text-xl font-semibold mb-4">Thông tin sản phẩm</div>
            <div className="flex flex-col">
              <div className="text-xs text-zinc-400">Tên sản phẩm:</div>
              <div className="text-sm font-semibold">{product.name}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-zinc-400">Mã Sku:</div>
              <div className="text-sm font-semibold">{product.sku}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-zinc-400">Đơn giá:</div>{' '}
              <div className="text-sm font-semibold">{(product.price || 0).toLocaleString('en-GB')}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs text-zinc-400">Trạng thái:</div>{' '}
              <Toggle
                name="isActive"
                checked={updateData.isActive}
                onChange={handleUpdate}
                checkedTitle="Đang hoạt động"
                uncheckedTitle="Đang ẩn"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs text-zinc-400">Cho phép đặt trước:</div>{' '}
              <Toggle
                name="preOrder"
                checked={updateData.preOrder}
                onChange={handleUpdate}
                checkedTitle="Có"
                uncheckedTitle="Không"
              />
            </div>
          </div>
          <div className="attribute flex flex-col gap-4">
            <div className="text-xl font-semibold mb-4">Thuộc tính</div>
            <div className="flex flex-col">
              <div className="text-xs text-zinc-400">Size</div>
              <div className="text-sm font-semibold">{product.size.join(', ')}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-zinc-400">Màu</div>
              <div className="grid grid-cols-2 gap-4">
                {product.color.map((color, index) => {
                  return (
                    <div key={index} className="flex gap-2 items-center">
                      <div style={{ backgroundColor: color.value }} className="w-6 h-6 border shadow"></div>
                      <div className="text-sm">
                        {color.name} - {color.id}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-zinc-400">Danh mục</div>
              <div className="flex gap-2 flex-wrap">
                {product.categoryName.map((cat, index) => {
                  return (
                    <div key={index} className="bg-zinc-300 text-sm rounded-xl px-2 py-1 whitespace-nowrap">
                      {cat}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-end p-4">
        <Button className="text-sm py-2 px-4" onClick={cancelEdit} outline>
          Huỷ
        </Button>
        <Button className="text-sm py-2 px-4" onClick={() => console.log('save')} primary>
          Lưu
        </Button>
      </div>
    </>
  );
}

export default ProductEditParent;
