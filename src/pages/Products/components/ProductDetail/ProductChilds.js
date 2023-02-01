import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { callProductService } from '~/helper/services/callServices';
const imageBaseUrl = 'https://cdn.ssstutter.com/products/';

function ProductChilds({ product }) {
  const [childs, setChilds] = useState([]);
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

  if (loading)
    return (
      <div className="flex justify-center mt-4">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin w-16 h-16" />
      </div>
    );

  return (
    <>
      {childs.map((child, index) => {
        const thumbnail = product.media[`color_${child.color.id}_thumbnail`]?.x100 || 'no_image.png';
        return (
          <div key={index} className="p-4 border-b">
            <div className="flex gap-4 mb-4">
              <div className="w-36 rounded aspect-square overflow-hidden flex items-center justify-center">
                <img className="w-full" src={imageBaseUrl + thumbnail} alt="thumbnail" loading="auto" />
              </div>
              <div className="flex flex-1 gap-16">
                <div className="flex flex-col flex-1 gap-2">
                  <div className="font-semibold">{child.name}</div>
                  <div className="italic text-sm">{child.sku}</div>
                  <div className="text-sm">Giá: {child.price.toLocaleString('en-US')}</div>
                </div>
                <div className="flex flex-col gap-2 w-64">
                  <div className="text-sm">Mã vạch: {child.barcode}</div>
                  <div className="text-sm">Trạng thái: {child.isActive ? 'Hoạt động' : 'Ẩn'}</div>
                  <div className="text-sm">Ngày tạo: {new Date(child.createdTime).toLocaleString('en-GB')}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductChilds;
