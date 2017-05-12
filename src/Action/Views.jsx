const Views = (dispatch) => {
  const changeLight = { type: 'changeLight' }; // 修改导航样式
  const changeCollapsed = { type: 'changeCollapsed' }; // 菜单展开与缩小

  return {
    changeLight: () => dispatch(changeLight),
    changeCollapsed: () => dispatch(changeCollapsed),
  };
};


// 定义全局view的action
export default Views;
