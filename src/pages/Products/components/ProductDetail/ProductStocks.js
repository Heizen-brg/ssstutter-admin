import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { callWarehouseService } from '~/helper/services/callServices';

function ProductStocks({ product }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchStocks = async () => {
      setLoading(true);
      try {
        const stocks = await callWarehouseService(
          'GET',
          'SEARCH_STOCK',
          { sku: product.sku, limit: 'all', productName: true, warehouseName: true },
          'by-passs',
        );
        setStocks(stocks?.result?.sort((a, b) => a.sku.localeCompare(b.sku)) || []);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    searchStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { totalStock, sortWarehouse } = useMemo(() => {
    let totalStock = 0;
    const warehouseList = stocks.reduce((result, current) => {
      Object.keys(current.warehouse).forEach((warehouse) => {
        if (result[warehouse]) {
          result[warehouse].total += current.available[warehouse];
        } else {
          result[warehouse] = {
            warehouse,
            total: current.available[warehouse],
            name: current.warehouse[warehouse].name.replace('SSSTUTTER - ', ''),
          };
        }
        totalStock += current.available[warehouse];
      });
      return result;
    }, {});
    const sortWarehouse = Object.values(warehouseList).sort((a, b) => a.warehouse.localeCompare(b.warehouse));
    return { totalStock, warehouseList, sortWarehouse };
  }, [stocks]);

  if (loading)
    return (
      <div className="flex justify-center mt-4">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin w-16 h-16" />
      </div>
    );

  return (
    <div className="h-full overflow-scroll">
      <table className="table-auto border-separate border-spacing-0 border border-slate-300 w-full">
        <thead className="sticky top-0 z-10">
          <tr className="border border-slate-300">
            <th className="border border-slate-300 bg-slate-200 p-2 whitespace-nowrap sticky left-0">Sản phẩm / Kho</th>
            {sortWarehouse.map((warehouse, index) => (
              <th
                key={index}
                className="border border-slate-300 bg-slate-200 p-2 whitespace-nowrap text-center min-w-[100px]"
              >
                {warehouse.name}
              </th>
            ))}
            <th className="border border-slate-300 bg-slate-200 p-2 whitespace-nowrap min-w-[100px]">Tổng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 p-2 font-bold sticky left-0 bg-white text-center">Tổng</td>
            {sortWarehouse.map((warehouse, index) => (
              <td key={index} className="border border-slate-300 p-2 font-bold  text-sm">
                {warehouse.total}
              </td>
            ))}
            <td className="border border-slate-300 p-2 font-bold  text-sm">{totalStock}</td>
          </tr>
          {stocks.map((product, index) => {
            let total = 0;
            return (
              <tr key={index}>
                <th className="border border-slate-300 text-sm p-2 font-semibold sticky left-0 bg-white">
                  {product.name}
                </th>
                {sortWarehouse.map((warehouse, index) => {
                  const stock = product?.available?.[warehouse.warehouse] || 0;
                  total += stock;
                  return (
                    <td key={index} className="border border-slate-300 p-2 text-sm">
                      {stock}
                    </td>
                  );
                })}
                <td className="border border-slate-300 p-2 font-bold  text-sm">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductStocks;
