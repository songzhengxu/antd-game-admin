import React, { Component } from 'react';
import { Icon, Menu } from 'antd';

const SubMenu = Menu.SubMenu;


class Main extends Component {
  render() {
    const { Views, changeCollapsed } = this.props;
    return (
      <div className="header">
        <div className="button" onClick={changeCollapsed}>
          <Icon type={Views.collapsed ? 'menu-unfold' : 'menu-fold'} />
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
export default Main;
