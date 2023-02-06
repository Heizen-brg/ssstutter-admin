import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import Button from '~/components/Button/Button';
import { CONFIG } from '~/helper/config/config';
import { callProductService } from '~/helper/services/callServices';

function ProductEditChilds({ product, cancelEdit }) {
  const [childs, setChilds] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchChild = async () => {
      setLoading(true);
      try {
        const childs = await callProductService(
          'GET',
          'SEARCH_CHILD',
          { parentSku: product.sku, limit: 'all' },
          'by-passs',
        );
        setChilds(childs?.result?.sort((a, b) => a.sku.localeCompare(b.sku)) || []);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    searchChild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e) => {
    const id = e.target.dataset.id;
    let data = { id, [e.target.name]: e.target.checked };
    if (!updateData[id]) setUpdateData({ ...updateData, [id]: data });
    else setUpdateData({ ...updateData, [id]: { ...updateData[id], ...data } });
  };

  if (loading)
    return (
      <div className="flex justify-center mt-4">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin w-16 h-16" />
      </div>
    );

  return (
    <>
      <div className="flex-1 overflow-scroll">
        {childs.map((child, index) => {
          const thumbnail = product.media[`color_${child.color.id}_thumbnail`]?.x100 || 'no_image.png';
          const currentChild = updateData[child.id] || child;
          return (
            <div key={index} className="p-4 border-b">
              <div className="flex gap-4 mb-4">
                <div className="w-36 rounded aspect-square overflow-hidden flex items-center justify-center">
                  <img className="w-full" src={CONFIG.IMAGE_BASE_URL + thumbnail} alt="thumbnail" loading="auto" />
                </div>
                <div className="flex flex-1 gap-16">
                  <div className="flex flex-col flex-1 gap-2">
                    <div className="font-semibold">{child.name}</div>
                    <div className="italic text-sm">{child.sku}</div>
                    <div className="text-sm">Giá: {child.price.toLocaleString('en-US')}</div>
                  </div>
                  <div className="flex flex-col gap-2 w-64">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Trạng thái:</div>{' '}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          data-id={child.id}
                          name="isActive"
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={currentChild.isActive}
                          onChange={handleUpdate}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {currentChild.isActive ? 'Đang hoạt động' : 'Đang ẩn'}
                        </span>
                      </label>
                    </div>
                    <div className="text-sm">Ngày tạo: {new Date(child.createdTime).toLocaleString('en-GB')}</div>
                    <Barcode value={child.barcode} fontSize={16} height={60} width={1.5} margin={0} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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

export default ProductEditChilds;
