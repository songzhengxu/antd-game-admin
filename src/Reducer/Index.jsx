/**
 * 定义所有的Redux 在当前文件 进行导出
 * redux 捕获action 返回新的state
 */
import Views from './views';
import GameManagement from './Games/games';
import { firstInformationReducer, secondInformationReducer } from '../utils/HighOrderReducerExample';
import AdsMobileReducer from './Ads/MobileReducer';

export default {
  Views, GameManagement, AdsMobileReducer, firstInformationReducer, secondInformationReducer,
};
