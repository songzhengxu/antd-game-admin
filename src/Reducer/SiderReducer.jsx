const SiderReducer = (state = { light: false }, action) => {
  switch (action.type) {
    case 'changeLight': // 修改
      return { light: !state.light };
    default:
      return state;
  }
};
export default SiderReducer;
