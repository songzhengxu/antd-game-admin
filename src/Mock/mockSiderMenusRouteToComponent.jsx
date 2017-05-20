
// 广告管理
import AdsMobile from '~/Component/Ads/Mobile';
import AdsWeb from '~/Component/Ads/Web';
import AdsGamebox from '~/Component/Ads/Gamebox';

// 礼包管理
import Gifts from '~/Component/Gift/Gifts';

// 游戏管理

import GameList from '~/Component/Games/Games';
import AddGame from '~/Component/Games/editor';
import Information from '~/Component/Games/informations';
import Type from '~/Component/Games/types';

// 信息管理
import Messages from '~/Component/Message/Messages';
import MessageEditor from '~/Component/Message/Editor';

// 设置
import SettingMenu from '~/Component/Setting/Menu';
import UserInfo from '~/Component/Setting/UserInfo';
import PasswordComponent from '~/Component/Setting/Password';
import Smtp from '~/Component/Setting/Smtp';
import RoleMangementWithTabs from '~/Component/Setting/Rbac';
import AdminsWithTabs from '~/Component/Setting/Admins';

// 内容管理
import DataTable from '~/Component/Content/Subject';
import ContentEditor from '~/Component/Content/Editor';
import { Action, Addaction } from '~/Component/Content/Activitys';
import { Servers } from '~/Component/Content/Servers';

// 平台币管理
import Editor from '~/Component/Currency/Editor';
import Record from '~/Component/Currency/Records';

// 玩家管理
import Players from '~/Component/Player/Players';

// 开发平台
import AgentHot from '~/Component/Agent/Hot';
import AgentChannels from '~/Component/Agent/Channels';
import AgentSummarizes from '~/Component/Agent/Summarizes';
import AgentPendinglists from '~/Component/Agent/Pendinglists';
import AgentAuditlists from '~/Component/Agent/Auditlists';
import AgentAccounts from '~/Component/Agent/Accounts';
import AgentQualities from '~/Component/Agent/Qualities';
import AgentChanneldata from '~/Component/Agent/Channeldata';

// 数据统计
import StatisticsKeep from '~/Component/Statistics/Keep';
import StatisticsRecharge from '~/Component/Statistics/Recharge';
import StatisticsConsume from '~/Component/Statistics/Consume';
import StatisticsDaily from '~/Component/Statistics/Daily';
import StatisticsGame from '~/Component/Statistics/Game';

// 网站管理
import TabComponent from '~/Component/Web/Website';
import { Amends } from '~/Component/Web/Service';


const mockRouterToComponent =
  {
    routerToComponent: {
      '/ads/mobile': AdsMobile,
      '/ads/web': AdsWeb,
      '/ads/gamebox': AdsGamebox,
      '/games/games': GameList,
      '/games/editor': AddGame,
      '/games/informations': Information,
      '/games/types': Type,
      '/setting/menus': SettingMenu,
      '/setting/user/userinfo': UserInfo,
      '/setting/user/password': PasswordComponent,
      '/setting/mail/smtp': Smtp,
      '/setting/rbac': RoleMangementWithTabs,
      '/setting/admins': AdminsWithTabs,
      '/message/messages': Messages,
      '/message/editor': MessageEditor,
      '/gift/gifts': Gifts,
      '/content/subjects/editor': ContentEditor,
      '/content/subjects': DataTable,
      '/content/activitys': Action,
      '/content/servers': Servers,
      '/content/addAction': Addaction,
      '/currency/eidtor': Editor,
      '/currency/records': Record,
      '/player/players': Players,
      '/agent/hots': AgentHot,
      '/agent/channels': AgentChannels,
      '/agent/summarizes': AgentSummarizes,
      '/agent/pendinglists': AgentPendinglists,
      '/agent/auditlists': AgentAuditlists,
      '/agent/accounts': AgentAccounts,
      '/agent/qualities': AgentQualities,
      '/agent/channeldata': AgentChanneldata,
      '/statistics/keep': StatisticsKeep,
      '/statistics/recharge': StatisticsRecharge,
      '/statistics/consume': StatisticsConsume,
      '/statistics/daily': StatisticsDaily,
      '/statistics/game': StatisticsGame,
      '/web/website': TabComponent,
      '/web/service': Amends,


    },
  };

export default mockRouterToComponent;
