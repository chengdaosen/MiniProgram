type ServiceItem = {
  name: string;
  desc: string;
  icon: string;
  targetUrl?: string;
};

type GoodsItem = {
  image: string;
  title: string;
  tag: string;
  priceInt: string;
  priceDecimal: string;
  cycle: string;
};

type IndexPageData = {
  SDKVersion: string;
  signedIn: boolean;
  serviceList: ServiceItem[];
  goodsList: GoodsItem[];
};

type ServiceTapEvent = {
  currentTarget?: {
    dataset?: {
      index?: number;
    };
  };
};

type IndexPageInstance = {
  data: IndexPageData;
  setData: (data: Partial<IndexPageData>, callback?: () => void) => void;
};

const SERVICE_LIST: ServiceItem[] = [
  {
    name: '租币商城',
    desc: '租币当钱花',
    icon: '/assets/index/pic_shop.svg',
  },
  {
    name: '租币任务',
    desc: '租币赚不停',
    icon: '/assets/index/pic_task.svg',
    targetUrl: '/pages/task/index',
  },
  {
    name: '租币赢现金',
    desc: '每天分万元现金',
    icon: '/assets/index/pic_cash.svg',
  },
  {
    name: '租币抽奖',
    desc: '天天免费抽',
    icon: '/assets/index/pic_shop.svg',
  },
];

const GOODS_LIST: GoodsItem[] = [
  {
    image: '/assets/index/Bitmap1.svg',
    title: '顶配 iPhone Xs 256G',
    tag: '免押金',
    priceInt: '6',
    priceDecimal: '.88',
    cycle: '30天起租',
  },
  {
    image: '/assets/index/Bitmap.svg',
    title: 'iPhone 6s 64g 白色',
    tag: '免押金',
    priceInt: '6',
    priceDecimal: '.88',
    cycle: '30天起租',
  },
  {
    image: '/assets/index/Bitmap2.svg',
    title: '顶配 MacBook Pro 256G',
    tag: '免押金',
    priceInt: '6',
    priceDecimal: '.88',
    cycle: '30天起租',
  },
  {
    image: '/assets/index/Bitmap3.svg',
    title: '顶配 iPhone Xs 256G',
    tag: '免押金',
    priceInt: '6',
    priceDecimal: '.88',
    cycle: '30天起租',
  },
];

Page({
  data: {
    SDKVersion: '',
    signedIn: false,
    serviceList: SERVICE_LIST,
    goodsList: GOODS_LIST,
  } as IndexPageData,

  onLoad(this: IndexPageInstance, query: Record<string, string>) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady(this: IndexPageInstance) {
    // 页面加载完成
  },
  onShow(this: IndexPageInstance) {
    // 页面显示
    this.setData({
      SDKVersion: my.SDKVersion,
    });
  },
  handleSignToggle(this: IndexPageInstance) {
    this.setData({
      signedIn: !this.data.signedIn,
    });
  },
  goMessage(this: IndexPageInstance) {
    my.redirectTo({
      url: '/pages/message/index',
    });
  },
  onServiceTap(this: IndexPageInstance, e: ServiceTapEvent) {
    const index = e?.currentTarget?.dataset?.index;
    if (typeof index !== 'number') {
      return;
    }
    const service = this.data.serviceList?.[index];
    if (!service?.targetUrl) {
      return;
    }
    my.redirectTo({
      url: service.targetUrl,
    });
  },
  onUnload(this: IndexPageInstance) {
    // 页面被关闭
  },
  onTitleClick(this: IndexPageInstance) {
    // 标题被点击
  },
  onPullDownRefresh(this: IndexPageInstance) {
    // 页面被下拉
  },
  onReachBottom(this: IndexPageInstance) {
    // 页面被拉到底部
  },
  onShareAppMessage(this: IndexPageInstance) {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
