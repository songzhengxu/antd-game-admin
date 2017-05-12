import update from 'react-addons-update'; // 引入react-addons-update创建，用于immutable 更新data

const data = {
  gameList: {
    status: 'WAIT_FOR_FETCHING',
    filterWord: {
      need: false,
      shaixuanzhuangtai: [],
      shaixuanyouxileixing: [],
      shaixuanyouximingcheng: '',
    },
  },
};


export default function GameManagementReducer(state = data, action) {
  const { type } = action;
  switch (type) {
    case 'GET_DATA':
      {
        const newState = update(state,
          { gameList:
          { status: { $set: type },
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
}
