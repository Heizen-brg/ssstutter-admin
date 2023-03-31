import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { callProductService } from '~/helper/services/callServices';
const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
function SelectProduct(props) {
  const { currentData, selectProducts } = props;
  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentProducts, setCurrentProducts] = useState(currentData || []);
  const [products, setProducts] = useState([]);
  const loading = openSearch && options.length === 0;

  const [query, setQuery] = useState({
    skip: 0,
    limit: 40,
    name: '',
  });

  const onSearch = (e) => {
    setQuery({ ...query, name: e.target.value });
  };

  const searchProduct = async () => {
    try {
      const products = await callProductService('GET', 'SEARCH_PARENT', { ...query }, 'by-passs');
      setProducts(products.result);
    } catch (err) {
      console.log(err.message);
    } finally {
      return;
    }
  };
  // useEffect(() => {
  //
  // }, [currentProducts]);

  useEffect(() => {
    (async () => {
      await sleep(1e3);
      setOptions([...products]);
    })();
  }, [products]);

  useEffect(() => {
    const timeOutId = setTimeout(() => searchProduct(), 500);
    return () => clearTimeout(timeOutId);
  }, [query.name]);

  useEffect(() => {
    if (!openSearch) {
      setOptions([]);
    }
  }, [openSearch]);

  return (
    <Autocomplete
      open={openSearch}
      onOpen={() => {
        setOpenSearch(true);
      }}
      onClose={() => {
        setOpenSearch(false);
      }}
      onChange={(event, newValue) => {
        selectProducts(newValue);
      }}
      multiple
      defaultValue={currentProducts}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options || []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tìm kiếm sản phẩm"
          onChange={onSearch}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default SelectProduct;
