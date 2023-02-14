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
  MEDIA: {
    BASE_URL: 'https://core.leanow.vn/api',
    ENDPOINT: {
      GET: {
        SEARCH_MEDIA: 'media/search',
      },
      POST: {
        UPLOAD_MEDIA: 'media/upload',
      },
      DELETE: {
        DELETE_MEDIA: 'media/remove',
      },
    },
  },
  BANNER: {
    BASE_URL: 'https://core.leanow.vn/api',
    ENDPOINT: {
      GET: {
        SEARCH_BANNER: 'banner/search',
      },
      POST: {
        CREATE_BANNER: 'banner/create',
      },
      PUT: {
        UPDATE_BANNER: 'banner/update',
      },
      DELETE: {
        DELETE_BANNER: 'banner/remove',
      },
    },
  },
};

export const CONFIG = {
  IMAGE_BASE_URL: 'https://cdn.ssstutter.com/products/',
  CMS_IMAGE_URL: 'https://core.leanow.vn/',
};
