import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  giftList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('giftList');
const giftListReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'giftList', data });
const GiftListReducer = giftListReducerMaker.makeReduer();
export default GiftListReducer;
