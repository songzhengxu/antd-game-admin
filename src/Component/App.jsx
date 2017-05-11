import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';


import Header from './Common/Header';
import Footer from './Common/Footer';
import Sider from './Common/Sider';
import Bread from './Common/Bread';
import AdsMobile from './Ads/Mobile'; // advertisementMobile
import GameList from './Games/Games';
import AddGame from './Games/editor';
import { DataTable, AddContent } from './ContentManagementModule/ContentTable';
import { Action, Addaction } from './ContentManagementModule/ActionControl';


import mockSiderMenusJson from './Common/mockSiderMenus.json';

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
          <Route exact path="/games/games" component={GameList} />
          <Route exact path="/games/editor" component={AddGame} />
          <Route path="/gameType" component={AdsMobile} />
          <Route path="/gameNews" component={AdsMobile} />
          <Route path="/content/subjects" component={DataTable} />
          <Route path="/content/activitys" component={Action} />

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
    const { HeaderReducer, SiderReducer } = this.props;
    return (
      <div>
        <div className={HeaderReducer.collapsed ? 'layout fold' : 'layout'}>
          <aside className={!SiderReducer.light ? 'sider light' : 'sider'}>
            <Sider theme={SiderReducer.light ? 'dark' : 'light'} />
          </aside>
          <div className="main">
            <Header />
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

export default connect(state =>
   ({ HeaderReducer: state.HeaderReducer, SiderReducer: state.SiderReducer }), null)(App);
