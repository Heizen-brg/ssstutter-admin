import { CONFIG } from '~/helper/config/config';

function ProductParent({ product }) {
  return (
    <>
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
            <div className="text-xs text-zinc-400">Giá nhập:</div>{' '}
            <div className="text-sm font-semibold">{(product.importPrice || '').toLocaleString('en-GB')}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-zinc-400">Đơn giá:</div>{' '}
            <div className="text-sm font-semibold">{(product.price || 0).toLocaleString('en-GB')}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-zinc-400">Trạng thái:</div>{' '}
            <div className="text-sm font-semibold">{product.isActive ? 'Đang hoạt động' : 'Đang ẩn'}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-zinc-400">Cho phép đặt trước:</div>{' '}
            <div className="text-sm font-semibold">{product.preOrder ? 'Có' : 'Không'}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-zinc-400">Ngày tạo:</div>{' '}
            <div className="text-sm font-semibold">{new Date(product.createdTime).toLocaleString('en-GB')}</div>
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
      <div className="px-4 pt-4">
        <div className="bg-zinc-100 p-4 rounded">
          <div className="flex gap-12">
            <div className="w-28 font-semibold mb-4">Thumbnail</div>
            <div className="font-semibold mb-4">Gallery</div>
          </div>
          <div>
            {product.color.map((color, index) => {
              const thumbnail = product.media[`color_${color.id}_thumbnail`]?.x100 || 'no_image.png';
              const gallery = product.media[`color_${color.id}_gallery`] || [];
              return (
                <div key={index} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ backgroundColor: color.value }} className="w-6 h-6 border shadow"></div>
                    <div className="text-sm font-semibold">{color.name}</div>
                  </div>
                  <div className="flex gap-12">
                    <div className="w-28 min-w-[7rem] border rounded aspect-square overflow-hidden flex items-center justify-center">
                      <img className="w-full" src={CONFIG.IMAGE_BASE_URL + thumbnail} alt="thumbnail" />
                    </div>
                    <div className="flex gap-4 flex-nowrap overflow-auto">
                      {gallery.map((img, index) => (
                        <div
                          key={index}
                          className="w-28 min-w-[7rem] border rounded aspect-square overflow-hidden flex items-center justify-center"
                        >
                          <img className="w-full" src={CONFIG.IMAGE_BASE_URL + img.x100} alt="gallery" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductParent;
