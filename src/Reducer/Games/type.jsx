import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  gameTypeList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('gameTypeList');
const gameTypeReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'gameTypeList', data });
const GameTypeReducer = gameTypeReducerMaker.makeReduer();
export default GameTypeReducer;
