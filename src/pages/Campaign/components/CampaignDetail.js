import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Autocomplete, CircularProgress } from '@mui/material';
import { ImageUpload } from '~/components';

const CampaignDetail = (props) => {
  const { id, title, url, image, mobileImage } = props;

  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);

  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = openSearch && options.length === 0;

  return (
    <div className="w-full">
      <div className=" p-5 border-b bg-white">
        <TextField
          autoFocus
          margin="dense"
          label="Tên Campaign"
          type="text"
          fullWidth
          variant="standard"
          size="small"
        />
        <div className="grid grid-cols-2 py-5 gap-10">
          <div className="w-full flex flex-row justify-start items-start gap-5">
            <div className="w-2/3">
              <h1>Desktop Banner</h1>
              <ImageUpload ratio="landscape" />
            </div>
            <div className="w-1/3">
              <h1>Mobile Banner</h1>
              <ImageUpload ratio="portrait" />
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Ngày bắt đầu"
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Giờ"
                  type="time"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Ngày kết thúc"
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Giờ"
                  type="time"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
            <div className="mt-6">
              <TextField className="w-full" label="Mô tả" multiline minRows={3} InputLabelProps={{ shrink: true }} />
            </div>
            <div className=" border-b border-t my-5 px-5 flex flex-row items-center">
              <ul className="w-full flex flex-row justify-between items-center">
                {['Đồng hồ', 'Filter giá', 'Giới tính', 'Tag sale', 'Tag stock'].map((item, index) => (
                  <li className="my-5 flex items-center gap-5" key={index}>
                    <FormControlLabel label={item} control={<Checkbox />} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <Button variant="contained" component="label" className="basis-1/3">
          Upload file sản phẩm
          {/* <input hidden type="file" onChange={uploadProductFile} onClick={onInputClick} /> */}
        </Button>
        <div className="basis-full py-4">
          <Autocomplete
            open={openSearch}
            onOpen={() => {
              setOpenSearch(true);
            }}
            onClose={() => {
              setOpenSearch(false);
            }}
            onChange={(event, newValue) => {
              setProducts([...newValue]);
            }}
            multiple
            value={products}
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
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
