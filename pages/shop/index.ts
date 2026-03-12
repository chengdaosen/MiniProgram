type ShopPromoItem = {
  id: string;
  title: string;
  subtitle: string;
  reward: string;
};

type ShopGoodsItem = {
  id: string;
  image: string;
  title: string;
  coinText: string;
  extraPrice: string;
  originPrice: string;
  soldText: string;
};

type ShopFilterItem = {
  id: string;
  label: string;
};

type FilterTapEvent = {
  currentTarget?: {
    dataset?: {
      filterId?: string;
    };
  };
};

type ShopPageData = {
  availableCoins: number;
  promoList: ShopPromoItem[];
  filterList: ShopFilterItem[];
  activeFilterId: string;
  goodsList: ShopGoodsItem[];
};

const SHOP_PROMO_LIST: ShopPromoItem[] = [
  {
    id: 'lottery',
    title: '天天抽大奖',
    subtitle: '免费得iPhone X',
    reward: 'G0>',
  },
  {
    id: 'guard',
    title: '“租”力防疫',
    subtitle: '宅家不无聊',
    reward: 'G0>',
  },
  {
    id: 'guide',
    title: '走路领租币',
    subtitle: '宅家不无聊',
    reward: 'G0>',
  },
];

const SHOP_FILTER_LIST: ShopFilterItem[] = [
  { id: 'all', label: '全部' },
  { id: '100', label: '1~100' },
  { id: '500', label: '100~500' },
  { id: '5000', label: '500~5000' },
  { id: '5000plus', label: '5000以上' },
];

const SHOP_GOODS_LIST: ShopGoodsItem[] = [
  {
    id: 'g1',
    image: '/assets/shop/Bitmap.svg',
    title: '顶配 iPhone Xs 256G',
    coinText: '200租币',
    extraPrice: '+9.9元',
    originPrice: '12.8元',
    soldText: '已兑2513件',
  },
  {
    id: 'g2',
    image: '/assets/shop/Bitmap(1).svg',
    title: '顶配 iPhone Xs 256G',
    coinText: '240租币',
    extraPrice: '+8.9元',
    originPrice: '14.8元',
    soldText: '已兑2200件',
  },
  {
    id: 'g3',
    image: '/assets/shop/Bitmap(2).svg',
    title: '顶配 iPhone Xs 256G',
    coinText: '200租币',
    extraPrice: '+9.9元',
    originPrice: '16.2元',
    soldText: '已兑1440件',
  },
  {
    id: 'g4',
    image: '/assets/shop/Bitmap(3).svg',
    title: '顶配 iPhone Xs 256G',
    coinText: '240租币',
    extraPrice: '+8.9元',
    originPrice: '17.8元',
    soldText: '已兑640件',
  },
];

Page({
  data: {
    availableCoins: 1560,
    promoList: SHOP_PROMO_LIST,
    filterList: SHOP_FILTER_LIST,
    activeFilterId: 'all',
    goodsList: SHOP_GOODS_LIST,
  } as ShopPageData,

  onFilterTap(this: { setData: (data: Partial<ShopPageData>) => void }, e: FilterTapEvent) {
    const filterId = e?.currentTarget?.dataset?.filterId;
    if (!filterId) {
      return;
    }
    this.setData({
      activeFilterId: filterId,
    });
  },
});
