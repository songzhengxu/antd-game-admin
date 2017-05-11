import update from 'react-addons-update';

const data = {};
data.gameList = {};
// 状态要写在每一个独立的数据源里面。否则，一次更新，整个state更新。
data.gameList.status = 'WAIT_FOR_FETCHING'; // REFRESH_DATA, GET_DATA
data.gameList.filterWord = {};
data.gameList.filterWord.need = false;
data.gameList.filterWord.shaixuanzhuangtai = [];
data.gameList.filterWord.shaixuanyouxileixing = [];
data.gameList.filterWord.shaixuanyouximingcheng = '';

const GameManagementReducer = function GameManagement(state = data, action) {
  switch (action.type) {
    case 'GET_DATA':
      {
        const newState = update(state,
          { gameList:
          { status: { $set: action.type },
            data: { $set: action.data },
          },
          });
        return newState;
      }
    case 'REFRESH_DATA':
      {
        const newState = Object.assign({}, state);
        newState.gameList.status = 'REFRESH_DATA';
        return newState;
      }
    default:
      return state;
  }
};

export default GameManagementReducer;
