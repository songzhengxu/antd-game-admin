// import update from 'react-addons-update'; // 引入react-addons-update创建，用于immutable 更新data
import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

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

const actionChecker = MakeActionChecker('gameList');
const gameListReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'gameList', data });
const GameManagementReducer = gameListReducerMaker.makeReduer();
export default GameManagementReducer;
