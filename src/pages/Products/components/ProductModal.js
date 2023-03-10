import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useModal } from '~/storages/context/ModalContext';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductEdit from './ProductEdit/ProductEdit';

function ProductModal({ product }) {
  const { hideModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 p-12">
      <div className="flex flex-col bg-white w-full h-full rounded">
        <div className="flex relative items-center justify-center h-14 border-b">
          <div className="font-semibold">{isEdit ? 'UPDATE' : product.name}</div>
          <FontAwesomeIcon className="absolute right-6 cursor-pointer" icon={faXmark} onClick={hideModal} />
        </div>
        {isEdit ? (
          <ProductEdit product={product} cancelEdit={() => setIsEdit(false)} />
        ) : (
          <ProductDetail product={product} setEdit={() => setIsEdit(true)} />
        )}
      </div>
    </div>
  );
}

export default ProductModal;
