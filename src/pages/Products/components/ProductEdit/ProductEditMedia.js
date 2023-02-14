import Button from '~/components/Button/Button';
import { CONFIG } from '~/helper/config/config';

function ProductEditMedia({ product, cancelEdit }) {
  return (
    <>
      <div className="flex-1 overflow-scroll">
        <div className="grid md:grid-cols-3 md:gap-12 p-4 h-full gap-y-12 grid-cols-1">
          <div className="flex flex-col gap-2 max-md:row-span-2 max-sm:row-span-1 shadow">
            <img
              className="aspect-[3/4] object-cover"
              src={`https://cdn.ssstutter.com/products/${product?.media?.featured || 'no_image.png'}`}
              alt="img"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2 md:overflow-scroll">
            <div className="flex flex-col gap-4">
              {product.color.map((color, index) => {
                const thumbnail = product.media[`color_${color.id}_thumbnail`]?.x100 || 'no_image.png';
                const gallery = product.media[`color_${color.id}_gallery`] || [];
                return (
                  <div key={index} className="bg-zinc-100 p-4 rounded">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <div className="w-28 font-semibold">Thumbnail</div>
                          <div className="flex items-center gap-2">
                            <div style={{ backgroundColor: color.value }} className="w-6 h-6 border shadow"></div>
                            <div className="text-sm font-semibold">{color.name}</div>
                          </div>
                        </div>
                        <div className="w-28 min-w-[7rem] border rounded aspect-square overflow-hidden flex items-center justify-center">
                          <img className="w-full" src={CONFIG.IMAGE_BASE_URL + thumbnail} alt="thumbnail" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold">Gallery</div>
                        <div className="flex gap-4 flex-nowrap overflow-auto">
                          {gallery.map((img, index) => (
                            <div
                              key={index}
                              className="w-28 min-w-[7rem] border rounded aspect-square overflow-hidden flex items-center justify-center"
                            >
                              <img className="w-full" src={CONFIG.IMAGE_BASE_URL + img.x100} alt="gallery" />
                            </div>
                          ))}
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
                  </div>
                );
              })}
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

export default ProductEditMedia;
