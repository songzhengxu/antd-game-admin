import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  rbacList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('rbacList');
const rbacListReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'rbacList', data });
const RbacListReducer = rbacListReducerMaker.makeReduer();
export default RbacListReducer;
