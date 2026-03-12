/**
 * 全局奖励提示条组件
 */
type RewardToastProps = {
  /** 是否显示提示条。 */
  show: boolean;
  /** 左侧图标地址。 */
  icon: string;
  /** 主标题文案。 */
  title: string;
  /** 副标题文案。 */
  subtitle: string;
  /** 右侧奖励值。 */
  rewardValue: number;
};

const DEFAULT_PROPS: RewardToastProps = {
  show: false,
  icon: '/assets/message/money.svg',
  title: '',
  subtitle: '',
  rewardValue: 0,
};

Component({
  props: DEFAULT_PROPS,
});
