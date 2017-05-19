import axios from 'axios';

// 准备3种状态，用于改变和判定state.gameList的数据状态。
const getData = 'GET_DATA';
const refreshData = 'REFRESH_DATA';
const waitForFetching = 'WAIT_FOR_FETCHING';

/**
 * [fetchData 用于异步拉取数据]
 * @param  {[String]} url [异步请求数据地址]
 * @return {[function]}     [一个带有dispatch参数的方法]
 */
const fetchData = function fetchData(url) {
  return dispatch => axios({
    method: 'get',
    url,
    responseType: 'json',
  })
    // .then(response => response.data.data)
    // .then(data => data.data)
    .then(data => dispatch({ type: getData, data }));
};

// 这里的state是全局store的state, state = store.getData();
/**
 * [shouldFetchDate 通过数据状态判断是否需要拉取数据]
 * @param  {[Objcet]} state [全局的state]
 * @return {[Boolean]}       [一个布尔值，判断是否需要拉取数据]
 */
const shouldFetchDate = function shouldFetchDate(state) {
  const status = state.GameManagement.gameList.status;
  console.log(status);
  return !!((status === waitForFetching || status === refreshData));
};

/**
 * [fetchDataIfNedd 用于异步拉取数据]
 * @param  {[String]} url [拉取数据的地址]
 * @return {[Function]}     [带有dispatch参数的方法]
 */
const fetchDataIfNeed = function fetchDataIfNedd(url) {
  return (dispatch, getState) => {
    if (shouldFetchDate(getState())) {
      return dispatch(fetchData(url));
    }
    return null;
  };
};

export default fetchDataIfNeed;
