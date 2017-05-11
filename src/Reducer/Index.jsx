/**
 * 定义所有的Redux 在当前文件 进行导出
 * redux 捕获action 返回新的state
 */
import HeaderReducer from './HeaderReducer';
import SiderReducer from './SiderReducer';
import GameManagement from './Games/games';
import AdsMobileReducer from './Ads/MobileReducer';


export default { HeaderReducer, SiderReducer, GameManagement, AdsMobileReducer };
