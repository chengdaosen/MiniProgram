Component({
  props: {
    currentTab: 'index',
  },
  methods: {
    onTabTap(e) {
      const tab = e?.currentTarget?.dataset?.tab;
      const pathMap = {
        index: '/pages/index/index',
        task: '/pages/task/index',
        message: '/pages/message/index',
      };
      if (!tab || tab === this.props.currentTab) {
        return;
      }
      const targetPath = pathMap[tab];
      if (!targetPath) {
        return;
      }
      my.redirectTo({ url: targetPath });
    },
  },
});
