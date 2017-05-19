import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  informationList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('informationList');
const gameInformationReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'informationList', data });
const GameInformationReducer = gameInformationReducerMaker.makeReduer();
export default GameInformationReducer;
