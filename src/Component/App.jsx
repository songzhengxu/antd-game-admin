import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import viewsAction from '../Action/Views';

// 导航菜单配置数据
import mockSiderMenusJson from '../Mock/mockSiderMenus.json';

// 布局通用组件
import Header from './Common/Header';
import Footer from './Common/Footer';
import Sider from './Common/Sider';
import Bread from './Common/Bread';

// 广告管理
import AdsMobile from './Ads/Mobile';
import AdsWeb from './Ads/Web';
import AdsGamebox from './Ads/Gamebox';

// 游戏管理

import GameList from './Games/Games';
import AddGame from './Games/editor';
import Information from './Games/informations';


// 内容管理
import { DataTable, AddContent } from './Content/Subject';
import { Action, Addaction } from './Content/Activitys';
import Servers from './Content/Servers';

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
          <Route path="/gameType" component={AdsMobile} />
          <Route path="/gameNews" component={AdsMobile} />
          <Route path="/content/subjects" component={DataTable} />
          <Route path="/content/activitys" component={Action} />
          <Route path="/content/servers" component={Servers} />
          <Route path="/addContent" component={AddContent} />
          <Route path="/addAction" component={Addaction} />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </div>
    );
  }
}

class App extends Component {
  render() {
    const { Views } = this.props;
    return (
      <div>
        <div className={Views.collapsed ? 'layout fold' : 'layout'}>
          <aside className={!Views.light ? 'sider light' : 'sider'}>
            <Sider {...this.props} theme={Views.light ? 'dark' : 'light'} />
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

export default connect(state => ({ Views: state.Views }), viewsAction)(App);
