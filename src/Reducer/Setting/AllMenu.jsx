import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  allMenuList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('allMenuList');
const allMenuListReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'allMenuList', data });
const AllMenuListReducer = allMenuListReducerMaker.makeReduer();
export default AllMenuListReducer;
