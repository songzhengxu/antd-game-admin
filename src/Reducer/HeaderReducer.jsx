const HeaderReducer = (state = { collapsed: false }, action) => {
  switch (action.type) {
    case 'changeCollapsed': // 修改
      return { collapsed: !state.collapsed };
    default:
      return state;
  }
};

export default HeaderReducer;
