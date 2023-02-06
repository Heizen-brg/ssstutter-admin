export const SERVICES = {
  PRODUCT: {
    BASE_URL: 'https://api.leanow.vn/pd',
    ENDPOINT: {
      GET: {
        SEARCH_PARENT: '/v2/parent/search',
        SEARCH_CHILD: '/v2/child/search',
      },
    },
  },
  WAREHOUSE: {
    BASE_URL: 'https://api.leanow.vn/wh',
    ENDPOINT: {
      GET: {
        SEARCH_STOCK: '/v2/stock/search',
      },
    },
  },
};

export const CONFIG = {
  IMAGE_BASE_URL: 'https://cdn.ssstutter.com/products/',
};
