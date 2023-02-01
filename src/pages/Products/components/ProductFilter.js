import Button from '~/components/Button/Button';
import CustomInput from '~/components/Input/CustomInput';
import CustomSelect from '~/components/Input/CustomSelect/CustomSelect';
import MultipleSelect from '~/components/Input/MultipleSelect/MultipleSelect';

function ProductFilter({ handleChange, handleSearch }) {
  const mediaOptions = [
    {
      title: 'Tất cả',
      value: '',
    },
    {
      title: 'Có ảnh',
      value: true,
    },
    {
      title: 'Không ảnh',
      value: false,
    },
  ];

  const activeOptions = [
    {
      title: 'Tất cả',
      value: '',
    },
    {
      title: 'Đang hoạt động',
      value: true,
    },
    {
      title: 'Không hoạt động',
      value: false,
    },
  ];

  return (
    <div className="w-full bg-zinc-100 rounded p-4 flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-8">
        <CustomInput placeholder="Sản phẩm" name="product" onChange={handleChange} />
        <CustomInput placeholder="Tồn kho" name="stock" onChange={handleChange} />
        <div className="col-span-2 flex w-full">
          <CustomInput
            className="h-full border border-gray-300 pl-2 rounded-l border-r-0 focus:border-gray-400"
            placeholder="Giá từ"
            name="priceFrom"
            custom
            onChange={handleChange}
          />
          <CustomInput
            className="h-full border border-gray-300 pl-2 rounded-r focus:border-gray-400 focus:border-l-gray-300"
            placeholder="Giá đến"
            name="priceTo"
            custom
            onChange={handleChange}
          />
        </div>
        <CustomSelect placeholder="Hình ảnh" name="media" options={mediaOptions} onChange={handleChange} />
        <CustomSelect placeholder="Hoạt động" name="isActive" options={activeOptions} onChange={handleChange} />
        <MultipleSelect
          placeholder="Danh mục"
          name="category"
          onChange={handleChange}
          options={[
            { title: 'test', value: 'a' },
            { title: 'test1', value: 'b' },
            { title: 'test2', value: 'c' },
            { title: 'test3', value: 'd' },
          ]}
        />
      </div>
      <div>
        <Button className="py-1.5 px-6" primary onClick={handleSearch}>
          Lọc
        </Button>
      </div>
    </div>
  );
}

export default ProductFilter;
