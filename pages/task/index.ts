type TaskItem = {
  id: string;
  title: string;
  icon: string;
  reward: number;
  done: boolean;
};

type TaskPageData = {
  totalCoins: number;
  newbieTasks: TaskItem[];
  dailyTasks: TaskItem[];
  showTaskDialog: boolean;
  showRewardToast: boolean;
  rewardValue: number;
  rewardSource: string;
};

const NEWBIE_TASKS: TaskItem[] = [
  {
    id: 'n1',
    title: '收藏人人租机小程序',
    icon: '/assets/message/bell.svg',
    reward: 0,
    done: true,
  },
  {
    id: 'n2',
    title: '进行实名认证',
    icon: '/assets/message/clear.svg',
    reward: 30,
    done: false,
  },
];

const DAILY_TASKS: TaskItem[] = [
  {
    id: 'd1',
    title: '逛一逛活动页',
    icon: '/assets/message/delete.svg',
    reward: 10,
    done: false,
  },
  {
    id: 'd2',
    title: '逛一逛首页',
    icon: '/assets/message/bell.svg',
    reward: 10,
    done: false,
  },
  {
    id: 'd3',
    title: '逛一逛生活号首页',
    icon: '/assets/message/clear.svg',
    reward: 10,
    done: false,
  },
  {
    id: 'd4',
    title: '阅读一条消息',
    icon: '/assets/message/money.svg',
    reward: 5,
    done: false,
  },
];

Page({
  data: {
    totalCoins: 3321,
    newbieTasks: NEWBIE_TASKS,
    dailyTasks: DAILY_TASKS,
    showTaskDialog: true,
    showRewardToast: false,
    rewardValue: 0,
    rewardSource: '任务完成',
  },

  noop() {},

  closeTaskDialog() {
    this.setData({
      showTaskDialog: false,
    });
  },

  onTaskAction(e: { currentTarget?: { dataset?: { id?: string } } }) {
    const id = e?.currentTarget?.dataset?.id;
    if (!id) {
      return;
    }

    const currentTask =
      this.data.newbieTasks.find((task) => task.id === id) ||
      this.data.dailyTasks.find((task) => task.id === id);

    if (!currentTask || currentTask.done) {
      return;
    }

    const nextRewardValue = currentTask.reward;
    const nextTotalCoins = this.data.totalCoins + nextRewardValue;
    this.setData(
      {
        totalCoins: nextTotalCoins,
        newbieTasks: this.data.newbieTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                done: true,
              }
            : task,
        ),
        dailyTasks: this.data.dailyTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                done: true,
              }
            : task,
        ),
        rewardValue: nextRewardValue,
        rewardSource: currentTask.title,
        showRewardToast: true,
      },
      () => {
        setTimeout(() => {
          this.setData({
            showRewardToast: false,
          });
        }, 1800);
      },
    );
  },
});
