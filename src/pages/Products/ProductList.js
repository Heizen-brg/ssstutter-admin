import { faAngleLeft, faAngleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { callProductService } from '~/helper/services/callServices';
import { useModal } from '~/storages/context/ModalContext';
import ProductCard from './components/ProductCard';
import ProductFilter from './components/ProductFilter';
import ProductModal from './components/ProductModal';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    skip: 0,
    limit: 40,
    product: '',
    stock: null,
    priceFrom: null,
    priceTo: null,
    media: null,
    isActive: null,
    category: null,
  });
  const { showModal } = useModal();

  useEffect(() => {
    searchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.skip]);

  const searchProduct = async () => {
    let price = null;
    if (query.priceFrom && query.priceTo) {
      price = `${query.priceFrom},${query.priceTo}`;
    } else if (query.priceFrom) {
      price = query.priceFrom;
    } else if (query.priceTo) {
      price = `0,${query.priceTo}`;
    }
    setLoading(true);
    try {
      const products = await callProductService('GET', 'SEARCH_PARENT', { ...query, price }, 'by-passs');
      setProducts(products.result);
      setTotal(products.total);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (!e.target.name) return;
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const changePage = async (action) => {
    if (action === 'prev') {
      const skip = Math.max(query.skip - query.limit, 0);
      if (skip === query.skip) return;
      setQuery({ ...query, skip });
    } else if (action === 'next') {
      if (query.skip >= total) return;
      const skip = query.skip + query.limit;
      setQuery({ ...query, skip });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full h-fit max-w-screen-xl">
        <div className="flex justify-between items-center mb-8 border-b">
          <div className="uppercase text-lg py-2">Danh sách sản phẩm</div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              className={`cursor-pointer text-sm ${query.skip <= 0 ? 'text-zinc-300 pointer-events-none' : ''}`}
              icon={faAngleLeft}
              onClick={() => changePage('prev')}
            />
            <div>{query.skip + 1}</div>
            <div>-</div>
            <div>{query.skip + Math.min(query.limit, products.length)}</div>
            <div>/</div>
            <div>{total}</div>
            <FontAwesomeIcon
              className={`cursor-pointer text-sm ${
                query.skip + products.length >= total ? 'text-zinc-300 pointer-events-none' : ''
              }`}
              icon={faAngleRight}
              onClick={() => changePage('next')}
            />
          </div>
        </div>
        <ProductFilter handleChange={handleChange} handleSearch={searchProduct} />
        {loading ? (
          <div className="flex justify-center mt-4">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin w-16 h-16" />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-8 mt-4">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onClick={() => showModal(<ProductModal product={product} />)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
