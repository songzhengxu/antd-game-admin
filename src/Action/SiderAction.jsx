// import axios from 'axios';
//
// const getData = 'GET_DATA';
// const refreshData = 'REFRESH_DATA';
// const waitForFetching = 'WAIT_FOR_FETCHING';
//
// const fetchData = function fetchData(url) {
//   return dispatch => axios({
//     method: 'get',
//     url,
//     responseType: 'json',
//   })
//     .then(response => response.data)
//     .then(data => data.data)
//     .then(data => dispatch({ type: getData, data }));
// };
//
// // 这里的state是全局store的state, state = store.getData();
// const shouldFetchDate = function shouldFetchDate(state) {
//   console.log(state);
//   if (state.SiderReducer.gameMenus.status === waitForFetching ||
//     state.SiderReducer.gameMenus.status === refreshData) {
//     return true;
//   }
//   return false;
// };
//
// const fetchDataIfNeed = function fetchDataIfNedd(url) {
//   return (dispatch, getState) => {
//     if (shouldFetchDate(getState())) {
//       return dispatch(fetchData(url));
//     }
//     return null;
//   };
// };

const SiderToggleLightAction = (dispatch) => {
  const changeLight = { type: 'changeLight' };
  return { changeLight: () => dispatch(changeLight) };
};

// export default SiderToggleLightAction;
export default SiderToggleLightAction;
