import axios from 'axios';

const getData = 'GET_DATA';
const refreshData = 'REFRESH_DATA';
const waitForFetching = 'WAIT_FOR_FETCHING';

class AsyncAction {
  constructor(url, action, reducerName, propName, actionIdentifer) {
    this.url = url;
    this.action = action;
    this.reducerName = reducerName;
    this.propName = propName;
    this.actionIdentifer = actionIdentifer;
    this.fetchData = this.fetchData.bind(this);
    this.shouldFetchData = this.shouldFetchData.bind(this);
    this.fetchDataIfNeed = this.fetchDataIfNeed.bind(this);
  }
  fetchData() {
    const action = this.action;
    const url = this.url;
    const actionIdentifer = this.actionIdentifer;
    return dispatch => axios({
      method: action,
      url,
      responseType: 'json',
    })
    .then(data => dispatch({ name: actionIdentifer, type: getData, data }));
  }
  shouldFetchData(state) {
    const propName = this.propName;
    const reducerName = this.reducerName;
    const status = state[reducerName][propName].status;
    return !!((status === waitForFetching || status === refreshData));
  }
  fetchDataIfNeed() {
    const shouldFetchData = this.shouldFetchData;
    const fetchData = this.fetchData;
    return (dispatch, getState) => {
      if (shouldFetchData(getState())) {
        return dispatch(fetchData());
      }
      return null;
    };
  }
}
export default AsyncAction;
