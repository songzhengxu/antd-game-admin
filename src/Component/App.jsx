import React, { Component } from 'react';

import Header from './Common/Header';
import Footer from './Common/Footer';
import Sider from './Common/Sider';
import Bread from './Common/Bread';


class App extends Component {
  render() {
    return (
      <div>
        <div className="layout">
          <aside className="sider light">
            <Sider />
          </aside>
          <div className="main">
            <Header />
            <div className="container">
              <Bread />
              <div className="content">
                children2
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
