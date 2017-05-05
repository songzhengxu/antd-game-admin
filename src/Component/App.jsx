import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Common/Header';
import Footer from './Common/Footer';
import Sider from './Common/Sider';
import Bread from './Common/Bread';
import SiderMenuRoutes from '../Routes/SiderMenuRoutes';


class App extends Component {
  render() {
    const { HeaderReducer, SiderReducer } = this.props;
    return (
      <div>
        <div className={HeaderReducer.collapsed ? 'layout fold' : 'layout'}>
          <aside className={!SiderReducer.light ? 'sider light' : 'sider'}>
            <Sider />
          </aside>
          <div className="main">
            <Header />
            <div className="container">
              <Bread />
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
