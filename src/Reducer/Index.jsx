/**
 * 定义所有的Redux 在当前文件 进行导出
 * redux 捕获action 返回新的state
 */
import Views from './views'; // 页面全局交互state
import GameManagement from './Games/games';
import { firstInformationReducer, secondInformationReducer } from '../utils/HighOrderReducerExample';
import AdsMobileReducer from './Ads/MobileReducer';
import GameInformationReducer from './Games/informations';
import GameTypeReducer from './Games/type';
import GiftListReducer from './Gift/Gift';
import MessageListReducer from './Message/Message';
import SettingMenuListReducer from './Setting/SettingMenu';
import AllMenuListReducer from './Setting/AllMenu';
import RbacListReducer from './Setting/Rbac';
import AdminListReducer from './Setting/Admin';


export default {
  Views,
  GameManagement,
  AdsMobileReducer,
  firstInformationReducer,
  secondInformationReducer,
  GameInformationReducer,
  GameTypeReducer,
  GiftListReducer,
  MessageListReducer,
  SettingMenuListReducer,
  AllMenuListReducer,
  RbacListReducer,
  AdminListReducer,
};
