import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import viewsAction from '../Action/Views';

// 导航菜单配置数据
import mockSiderMenusJson from '../Mock/mockSiderMenus.json';

// 布局通用组件
import Header from './Common/Layout/Header';
import Footer from './Common/Layout/Footer';
import Sider from './Common/Layout/Sider';
import Bread from './Common/Layout/Bread';

// 广告管理
import AdsMobile from './Ads/Mobile';
import AdsWeb from './Ads/Web';
import AdsGamebox from './Ads/Gamebox';

// 礼包管理
import Gifts from './Gift/Gifts';

// 游戏管理

import GameList from './Games/Games';
import AddGame from './Games/editor';
import Information from './Games/informations';
import Type from './Games/types';

// 信息管理
import Messages from './Message/Messages';
import MessageEditor from './Message/Editor';

// 设置
import SettingMenu from './Setting/Menu';
import UserInfo from './Setting/UserInfo';
import PasswordComponent from './Setting/Password';
import Smtp from './Setting/Smtp';
import RoleMangementWithTabs from './Setting/Rbac';
import AdminsWithTabs from './Setting/Admins';

// 内容管理
import DataTable from './Content/Subject';
import ContentEditor from './Content/Editor';
import Action from './Content/Activitys';
import Addaction from './Content/AddAction';
import ServersTab from './Content/Servers';

// 平台币管理
import Editor from './Currency/Editor';
import Record from './Currency/Records';
import Summarize from './Currency/Summarize';

// 玩家管理
import Players from './Player/Players';

// 开发平台
import AgentHot from './Agent/Hot';
import AgentSummarizes from './Agent/Summarizes';
import AgentPendinglists from './Agent/Pendinglists';
import AgentAuditlists from './Agent/Auditlists';
import AgentAccounts from './Agent/Accounts';
import AgentQualities from './Agent/Qualities';
import AgentChanneldata from './Agent/Channeldata';

// 数据统计
import StatisticsKeep from './Statistics/Keep';
import StatisticsRecharge from './Statistics/Recharge';
import StatisticsConsume from './Statistics/Consume';
import StatisticsDaily from './Statistics/Daily';
import StatisticsGame from './Statistics/Game';

// 网站管理
import TabComponent from './Web/Website';
import Service from './Web/Service';
import Amend from './Web/AmendService';
import WebiteTab from './Web/Pictures';
import CompanyTab from './Web/Company';
import BlogrollTab from './Web/Blogroll';
import Contact from './Web/Contact';
import AmendContact from './Web/AmendContact';

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
);


const breadProps = {
  menu: mockSiderMenusJson.menus,
};

class SiderMenuRoutes extends Component {
  render() {
    return (
      <div className="contentInside">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ads/mobile" component={AdsMobile} />
          <Route path="/ads/web" component={AdsWeb} />
          <Route path="/ads/gamebox" component={AdsGamebox} />
          <Route exact path="/games/games" component={GameList} />
          <Route exact path="/games/editor" component={AddGame} />
          <Route exact path="/games/informations" component={Information} />
          <Route exact path="/games/types" component={Type} />
          <Route exact path="/setting/menus" component={SettingMenu} />
          <Route exact path="/setting/user/userinfo" component={UserInfo} />
          <Route exact path="/setting/user/password" component={PasswordComponent} />
          <Route exact path="/setting/mail/smtp" component={Smtp} />
          <Route exact path="/setting/rbac" component={RoleMangementWithTabs} />
          <Route exact path="/setting/admins" component={AdminsWithTabs} />
          <Route exact path="/message/messages" component={Messages} />
          <Route exact path="/message/editor" component={MessageEditor} />
          <Route exact path="/gift/gifts" component={Gifts} />
          <Route path="/content/subjects/editor" component={ContentEditor} />
          <Route path="/content/subjects" component={DataTable} />
          <Route exact path="/content/activitys" component={Action} />
          <Route exact path="/content/activitys/Addaction" component={Addaction} />
          <Route path="/content/servers" component={ServersTab} />
          <Route path="/currency/eidtor" component={Editor} />
          <Route path="/currency/records" component={Record} />
          <Route path="/addAction" component={Addaction} />
          <Route path="/player/players" component={Players} />
          <Route path="/agent/hots" component={AgentHot} />
          <Route path="/agent/summarizes" component={AgentSummarizes} />
          <Route path="/agent/pendinglists" component={AgentPendinglists} />
          <Route path="/agent/auditlists" component={AgentAuditlists} />
          <Route path="/agent/accounts" component={AgentAccounts} />
          <Route path="/agent/qualities" component={AgentQualities} />
          <Route path="/agent/channeldata" component={AgentChanneldata} />
          <Route path="/statistics/keep" component={StatisticsKeep} />
          <Route path="/statistics/recharge" component={StatisticsRecharge} />
          <Route path="/statistics/consume" component={StatisticsConsume} />
          <Route path="/statistics/daily" component={StatisticsDaily} />
          <Route path="/statistics/game" component={StatisticsGame} />
          <Route path="/web/website" component={TabComponent} />
          <Route exact path="/web/service" component={Service} />
          <Route exact path="/web/service/Amend" component={Amend} />
          <Route path="/web/pictures" component={WebiteTab} />
          <Route path="/web/company" component={CompanyTab} />
          <Route path="/web/blogroll" component={BlogrollTab} />
          <Route exact path="/web/contact" component={Contact} />
          <Route exact path="/web/contact/amendContact" component={AmendContact} />
          <Route path="/currency/summarize" component={Summarize} />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </div>
    );
  }
}

class App extends Component {
  render() {
    const { Views } = this.props;
    const { collapsed, light } = Views;
    return (
      <div>
        <div className={collapsed ? 'layout fold' : 'layout'}>
          <aside className={!light ? 'sider light' : 'sider'}>
            <Sider {...this.props} theme={light ? 'dark' : 'light'} />
          </aside>
          <div className="main">
            <Header {...this.props} />
            <div className="container">
              <Bread {...breadProps} location={location} />
              <div className="content">
                <SiderMenuRoutes />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  Views: React.PropTypes.object.isRequired,
};

export default connect(state => ({ Views: state.Views }), viewsAction)(App);
