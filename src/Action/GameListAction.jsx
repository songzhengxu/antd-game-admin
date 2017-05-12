import axios from 'axios';

const getData = 'GET_DATA';
const refreshData = 'REFRESH_DATA';
const waitForFetching = 'WAIT_FOR_FETCHING';


function fetchData(url) {
  return dispatch => axios({
    method: 'get',
    url,
    responseType: 'json',
  })
    .then(response => response.data.data)
    .then(data => dispatch({ type: getData, data }));
}

// 这里的state是全局store的state, state = store.getData();
function shouldFetchDate(state) {
  const states = state.GameManagement.gameList.status;
  // 三元运算
  if (states === waitForFetching || states === refreshData) {
    return true;
  }
  return false;
}

function fetchDataIfNedd(url) {
  return (dispatch, getState) => {
    if (shouldFetchDate(getState())) {
      return dispatch(fetchData(url));
    }
    return null;
  };
}

export default fetchDataIfNeed;
