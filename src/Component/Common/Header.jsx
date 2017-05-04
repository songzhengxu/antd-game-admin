import React, { Component } from 'react';
import { Icon, Menu } from 'antd';

const SubMenu = Menu.SubMenu;


class Mian extends Component {
  render() {
    return (
      <div className="header">
        <div className="button" >
          <Icon type="menu-fold" />
        </div>
        <div className="rightWarpper">
          <div className="button">
            <Icon type="mail" />
          </div>
          <Menu mode="horizontal">
            <SubMenu
              style={{
                float: 'right',
              }} title={<span > <Icon type="user" />
               admin</span>}
            >
              <Menu.Item key="logout">
              Sign out
            </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}
export default Mian;
