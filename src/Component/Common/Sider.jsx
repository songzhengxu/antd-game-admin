import React, { Component } from 'react';
import { Icon, Menu, Switch } from 'antd';

import config from '../../utils/config';


class Nav extends Component {
  render() {
    return (
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">nav 3</span>
        </Menu.Item>
      </Menu>
    );
  }
}

class Mian extends Component {
  render() {
    return (
      <div>
        <div className="logo">
          <img alt={'logo'} src={config.logo} />
          <span>{config.name}</span>
        </div>
        <Nav />
        <div className="switchtheme">
          <span><Icon type="bulb" />Switch Theme</span>
          <Switch />
        </div>
      </div>
    );
  }
}

export default Mian;
