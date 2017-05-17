import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  settingMenuList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('settingMenuList');
const settingMenuListReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'settingMenuList', data });
const SettingMenuListReducer = settingMenuListReducerMaker.makeReduer();
export default SettingMenuListReducer;
