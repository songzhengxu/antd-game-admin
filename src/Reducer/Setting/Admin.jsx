import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  adminList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('adminList');
const adminListReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'adminList', data });
const AdminListReducer = adminListReducerMaker.makeReduer();
export default AdminListReducer;
