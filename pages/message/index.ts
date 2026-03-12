/** 消息页顶部 tab 类型 */
type MessageTab = 'activity' | 'order';

/** 单条消息的数据结构 */
type MessageItem = {
  id: string;
  title: string;
  content: string;
  time: string;
  unread: boolean;
  read: boolean;
  detailContent?: string;
  detailSubTitle?: string;
  detailSubContent?: string;
};

/** 页面 data 的完整类型 */
type MessagePageData = {
  activeTab: MessageTab;
  activityList: MessageItem[];
  orderList: MessageItem[];
  showDeleteDialog: boolean;
  showActivityDetailDialog: boolean;
  currentActivityId: string;
  currentActivityTitle: string;
  currentActivityTime: string;
  currentActivityDetailContent: string;
  currentActivitySubTitle: string;
  currentActivitySubContent: string;
  /** 打开详情前是否未读，用于确认时判定奖励 */
  currentActivityWasUnread: boolean;
  /** 首次详情确认奖励是否已发放（全局只发一次） */
  hasShownDetailReward: boolean;
  showRewardToast: boolean;
  rewardValue: number;
};

/** 切换 tab 事件对象 */
type SwitchTabEvent = {
  currentTarget: {
    dataset: {
      tab?: MessageTab;
    };
  };
};

/** 活动详情点击事件对象 */
type ActivityDetailEvent = {
  currentTarget: {
    dataset: {
      id?: string;
    };
  };
};

/** 当前页面实例的最小类型约束 */
type MessagePageInstance = {
  data: MessagePageData;
  setData: (data: Partial<MessagePageData>, callback?: () => void) => void;
};

/** 活动公告初始数据 */
const INITIAL_ACTIVITY_LIST: MessageItem[] = [
  {
    id: 'a1',
    title: '活动通知',
    content: '恭喜获得20个租币，请查收',
    time: '2020-03-23 14:30',
    unread: true,
    read: false,
    detailContent:
      '恭喜获得20个租币，请查收。为了感谢其长久以来的陪伴，这里的文字请忽略。活动期间每天11点还会上线限量礼包，数量有限先到先得，用户们千万不要错过！',
    detailSubTitle: '小标题',
    detailSubContent: '此外，对于所有有贡献的用户。',
  },
  {
    id: 'a2',
    title: '免费得iPhone11',
    content: '恭喜获得20个租币，请查收',
    time: '2020-03-23 14:30',
    unread: true,
    read: false,
  },
  {
    id: 'a3',
    title: '这里的字符限制是十一个字',
    content: '恭喜获得20个租币，请查收',
    time: '2020-03-23 14:30',
    unread: true,
    read: false,
  },
  {
    id: 'a4',
    title: '节日赠租币',
    content: '人人租机祝你节日快乐，送88个租币位置限制隐藏文字展示效果',
    time: '2020-03-23 14:30',
    unread: true,
    read: false,
  },
];

/** 订单消息初始数据 */
const INITIAL_ORDER_LIST: MessageItem[] = [
  {
    id: 'o1',
    title: '订单已取消',
    content: '订单已成功取消，感谢您的关注',
    time: '2020-03-23 14:30',
    unread: true,
    read: false,
  },
];

Page({
  data: {
    activeTab: 'activity',
    activityList: INITIAL_ACTIVITY_LIST,
    orderList: INITIAL_ORDER_LIST,
    showDeleteDialog: false,
    showActivityDetailDialog: false,
    currentActivityId: '',
    currentActivityTitle: '',
    currentActivityTime: '',
    currentActivityDetailContent: '',
    currentActivitySubTitle: '',
    currentActivitySubContent: '',
    currentActivityWasUnread: false,
    hasShownDetailReward: false,
    showRewardToast: false,
    rewardValue: 20,
  },

  handleBack(this: MessagePageInstance) {
    if (getCurrentPages().length > 1) {
      my.navigateBack();
      return;
    }
    my.switchTab({
      url: '/pages/index/index',
    });
  },

  switchTab(this: MessagePageInstance, e: SwitchTabEvent) {
    const { tab } = e.currentTarget.dataset;
    if (!tab || tab === this.data.activeTab) {
      return;
    }
    this.setData({
      activeTab: tab,
    });
  },

  openDeleteDialog(this: MessagePageInstance) {
    this.setData({
      showDeleteDialog: true,
    });
  },

  closeDeleteDialog(this: MessagePageInstance) {
    this.setData({
      showDeleteDialog: false,
    });
  },

  noop() {},

  /** 打开活动详情并立即将该条消息标记为已读 */
  openActivityDetail(this: MessagePageInstance, e: ActivityDetailEvent) {
    const id = e.currentTarget.dataset.id;
    if (!id) {
      return;
    }
    const current = this.data.activityList.find((item) => item.id === id);
    if (!current) {
      return;
    }
    this.setData({
      showActivityDetailDialog: true,
      currentActivityId: id,
      currentActivityTitle: current.title,
      currentActivityTime: current.time,
      currentActivityDetailContent: current.detailContent || current.content,
      currentActivitySubTitle: current.detailSubTitle || '',
      currentActivitySubContent: current.detailSubContent || '',
      currentActivityWasUnread: current.unread,
      activityList: this.data.activityList.map((item) =>
        item.id === id
          ? {
              ...item,
              unread: false,
              read: true,
            }
          : item,
      ),
    });
  },

  closeActivityDetail(this: MessagePageInstance) {
    this.setData({
      showActivityDetailDialog: false,
      currentActivityId: '',
      currentActivityTitle: '',
      currentActivityTime: '',
      currentActivityDetailContent: '',
      currentActivitySubTitle: '',
      currentActivitySubContent: '',
      currentActivityWasUnread: false,
    });
  },

  /** 详情确认：仅在“首次未读进入详情”时展示奖励条 */
  confirmActivityDetail(this: MessagePageInstance) {
    const shouldShowReward = this.data.currentActivityWasUnread && !this.data.hasShownDetailReward;
    this.setData(
      {
        showActivityDetailDialog: false,
        currentActivityId: '',
        currentActivityTitle: '',
        currentActivityTime: '',
        currentActivityDetailContent: '',
        currentActivitySubTitle: '',
        currentActivitySubContent: '',
        currentActivityWasUnread: false,
        hasShownDetailReward: shouldShowReward ? true : this.data.hasShownDetailReward,
        showRewardToast: shouldShowReward,
      },
      () => {
        if (!shouldShowReward) {
          return;
        }
        setTimeout(() => {
          this.setData({
            showRewardToast: false,
          });
        }, 1800);
      },
    );
  },

  /** 删除当前正在查看的活动消息 */
  deleteCurrentActivity(this: MessagePageInstance) {
    const { currentActivityId } = this.data;
    if (!currentActivityId) {
      this.setData({
        showActivityDetailDialog: false,
        currentActivityId: '',
        currentActivityTitle: '',
        currentActivityTime: '',
        currentActivityDetailContent: '',
        currentActivitySubTitle: '',
        currentActivitySubContent: '',
        currentActivityWasUnread: false,
      });
      return;
    }
    this.setData({
      activityList: this.data.activityList.filter((item) => item.id !== currentActivityId),
      showActivityDetailDialog: false,
      currentActivityId: '',
      currentActivityTitle: '',
      currentActivityTime: '',
      currentActivityDetailContent: '',
      currentActivitySubTitle: '',
      currentActivitySubContent: '',
      currentActivityWasUnread: false,
    });
  },

  /** 仅删除当前 tab 内的已读消息 */
  confirmDeleteRead(this: MessagePageInstance) {
    const { activeTab } = this.data;
    if (activeTab === 'activity') {
      this.setData({
        activityList: this.data.activityList.filter((item) => !item.read),
        showDeleteDialog: false,
      });
      return;
    }
    this.setData({
      orderList: this.data.orderList.filter((item) => !item.read),
      showDeleteDialog: false,
    });
  },

  /** 仅标记当前 tab 为已读；活动公告 tab 触发奖励提示 */
  markAllRead(this: MessagePageInstance) {
    const { activeTab } = this.data;
    if (activeTab === 'activity') {
      const activityList = this.data.activityList.map((item) => ({
        ...item,
        unread: false,
        read: true,
      }));
      this.setData(
        {
          activityList,
          showRewardToast: activityList.length > 0,
        },
        () => {
          if (!this.data.showRewardToast) {
            return;
          }
          setTimeout(() => {
            this.setData({
              showRewardToast: false,
            });
          }, 1800);
        },
      );
      return;
    }

    const orderList = this.data.orderList.map((item) => ({
      ...item,
      unread: false,
      read: true,
    }));
    this.setData({
      orderList,
      showRewardToast: false,
    });
  },
});
