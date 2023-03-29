import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { callProductService } from '~/helper/services/callServices';

function SelectProduct(props) {
  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentProducts, setCurrentProducts] = useState(props.currentData || []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState({
    skip: 0,
    limit: 40,
    name: '',
  });

  const searchProduct = async () => {
    setLoading(true);
    try {
      const products = await callProductService('GET', 'SEARCH_PARENT', { ...query }, 'by-passs');
      setProducts(products.result);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...products]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!openSearch) {
      setOptions([]);
    } else {
      searchProduct();
    }
  }, [openSearch]);
  const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

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
        console.log(newValue);
        setCurrentProducts([...newValue]);
      }}
      multiple
      defaultValue={currentProducts}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tìm kiếm sản phẩm"
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
