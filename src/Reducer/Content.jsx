import update from 'react-addons-update';

const Content = (state = {}, action) => {
  switch (action.type) {
    case 'changeLight': // 修改样式风格
      return update(state, { light: { $set: !state.light } });
    case 'changeCollapsed': // 导航栏关闭和打开
      return update(state, { collapsed: { $set: !state.collapsed } });
    default:
      return state;
  }
};

export default Content;
