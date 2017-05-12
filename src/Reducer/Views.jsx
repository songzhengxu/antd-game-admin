import update from 'react-addons-update';
import { Tool } from '../utils/Tool';

const Views = (state = Tool.localItem('Views') ? JSON.parse(Tool.localItem('Views')) : { collapsed: false, light: false }, action) => {
  switch (action.type) {
    case 'changeLight': // 修改样式风格
      return update(state, { light: { $set: !state.light } });
    case 'changeCollapsed': // 导航栏关闭和打开
      return update(state, { collapsed: { $set: !state.collapsed } });
    default:
      return state;
  }
};

export default Views;
