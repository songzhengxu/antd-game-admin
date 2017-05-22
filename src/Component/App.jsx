import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { Route, Switch, Redirect } from 'react-router-dom';
import viewsAction from '../Action/Views';

// 导航菜单配置数据
import mockSiderMenusJson from '../Mock/mockSiderMenus.json';
// 导航菜单router 和 Component 对应配置数据
import mockSiderMenusRouteToComponentJson from '../Mock/mockSiderMenusRouteToComponent';

// 布局通用组件
import Header from './Common/Layout/Header';
import Footer from './Common/Layout/Footer';
import Sider from './Common/Layout/Sider';
import Bread from './Common/Layout/Bread';


const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
);


const breadProps = {
  menu: mockSiderMenusJson.menus,
};

// TODO 添加ComponentConfig（router 和component 名一一对应的名字）
class SiderMenuRoutes extends Component {


  getRoutes(array) {
    const menus = [];
    const componentConfig = mockSiderMenusRouteToComponentJson.routerToComponent;
    for (const [key, value] of Object.entries(componentConfig)) {
      if (!this.isHiddenRoute(key, array)) {
        const route = <Route exact path={key} component={value} />;
        menus.push(route);
      }
    }
    return menus;
  }

  isHiddenRoute(key, array) {
    const regexFirst = /\/\w*/g;
    const regexSecond = /\/\w*\/\w*/g;
    const firstPath = regexFirst.exec(key)[0];
    const secondPath = regexSecond.exec(key)[0];
    for (const [key, value] of array.entries()) {
      if (value.router === firstPath || value.routeTap === firstPath) {
        return true;
      }
    }
    for (const [key, value] of array.entries()) {
      if (value.router === secondPath || value.routeTap === secondPath) {
        return true;
      }
    }
    return false;
  }
  render() {
    // 过滤出被隐藏的 menu
    const hiddenMenus = lodash.cloneDeep(mockSiderMenusJson.menus)
    .filter(value => value.isHidden === true);
    return (
      <div className="contentInside">
        <Switch>
          <Route exact path="/" component={Home} />
          {this.getRoutes(hiddenMenus)}
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}


class App extends Component {
  render() {
    const { Views } = this.props;
    const { collapsed, light } = Views;
    // 过滤需要隐藏的菜单;
    const menus = lodash.cloneDeep(mockSiderMenusJson.menus)
    .filter(value => value.isHidden === false);

    return (
      <div>
        <div className={collapsed ? 'layout fold' : 'layout'}>
          <aside className={!light ? 'sider light' : 'sider'}>
            <Sider {...this.props} mockSiderMenusJsonMenus={menus} theme={light ? 'dark' : 'light'} />
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
