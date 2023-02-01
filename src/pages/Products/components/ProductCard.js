function ProductCard({ product, ...props }) {
  const handleNoImage = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://cdn.ssstutter.com/products/no_image.png';
  };
  const handleErrorImage = (e) => {
    e.currentTarget.onerror = handleNoImage;
    // eslint-disable-next-line no-self-assign
    e.currentTarget.src = e.currentTarget.src;
  };
  return (
    <div className="cursor-pointer rounded hover:shadow transition-all group" {...props}>
      <div className="overflow-hidden rounded">
        <img
          className="aspect-[3/4] object-cover group-hover:scale-110 transition-all"
          src={`https://cdn.ssstutter.com/products/${product?.media?.featured || 'no_image.png'}`}
          alt="img"
          onError={handleErrorImage}
        />
      </div>
      <div className="flex flex-col gap-2 px-2 py-4">
        <div className="text-sm font-semibold">{product.name}</div>
        <div className="text-xs">{product.sku}</div>
        <div className="text-xs">{product?.price?.toLocaleString('en-GB')}</div>
      </div>
    </div>
  );
}

export default ProductCard;
