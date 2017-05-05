const SiderToggleLightAction = (dispatch) => {
  const changeLight = { type: 'changeLight' };
  return { changeLight: () => dispatch(changeLight) };
};

export default SiderToggleLightAction;
