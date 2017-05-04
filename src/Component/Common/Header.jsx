import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'antd';
import HeaderToggleAction from '../../Action/HeaderAction';

const SubMenu = Menu.SubMenu;


class Main extends Component {
  render() {
    const { HeaderReducer, changeCollapsed } = this.props;
    return (
      <div className="header">
        <div className="button" onClick={changeCollapsed}>
          <Icon type={HeaderReducer.collapsed ? 'menu-unfold' : 'menu-fold'} />
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
export default connect(state => ({ HeaderReducer: state.HeaderReducer }), HeaderToggleAction)(Main);
