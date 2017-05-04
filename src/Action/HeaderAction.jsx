const HeaderToggleAction = (dispatch) => {
  const changeCollapsed = { type: 'changeCollapsed' };
  return { changeCollapsed: () => dispatch(changeCollapsed) };
};

export default HeaderToggleAction;
