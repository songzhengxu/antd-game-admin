import React, { Component } from 'react';
import { Icon, Menu, Switch } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SiderAction from '../../Action/SiderAction';

import config from '../../utils/config';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class Navgation extends Component {
  render() {
    const { HeaderReducer, theme } = this.props;
    return (
      <Menu mode={!HeaderReducer.collapsed ? 'inline' : 'vertical'} theme={theme} inlineIndent={!HeaderReducer.collapsed ? '24' : '0'} defaultSelectedKeys={['1']}>
        <SubMenu
          key="sub1" title={!HeaderReducer.collapsed ?
            <span><Icon type="bars" /><span>广告</span></span> : <span><Icon type="bars" /></span>}
        >
          <MenuItem key="1">
            <Link to="/adsMobile">
              <Icon type="user" />
              {<span className="nav-text">首页轮播图（移动端）</span>}
            </Link>
          </MenuItem>
          <MenuItem key="2">
            <Link to="/adsMobile">
              <Icon type="user" />
              {<span className="nav-text">首页轮播图（PC端）</span>}
            </Link>
          </MenuItem>
          <MenuItem key="3">
            <Link to="/adsMobile">
              <Icon type="user" />
              {<span className="nav-text">游戏盒子轮播管理）</span>}
            </Link>
          </MenuItem>
        </SubMenu>
        <MenuItem key="2">
          <Link to="/">
            <Icon type="video-camera" />
            {!HeaderReducer.collapsed ? <span className="nav-text">HomePage</span> : ''}
          </Link>
        </MenuItem>
        <MenuItem key="3">
          <Link to="/login">
            <Icon type="upload" />
            {!HeaderReducer.collapsed ? <span className="nav-text">Login</span> : ''}
          </Link>
        </MenuItem>
        <SubMenu
          key="sub4"
          title={<span><Icon type="setting" /><span>游戏管理</span></span>}
        >
          <MenuItem key="9">
            <Link to="/gameList">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">游戏列表</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="10">
            <Link to="/addGame">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">添加游戏</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="11">
            <Link to="/gameNews">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">游戏资讯</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="12">
            <Link to="/gameType">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">游戏类型</span> : ''}
            </Link>
          </MenuItem>
        </SubMenu>
        <MenuItem key="4">
          <Link to="/dada">
            <Icon type="upload" />
            {!HeaderReducer.collapsed ? <span className="nav-text">不存在的链接</span> : ''}
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}

const NavgationRedux = connect(state => ({ HeaderReducer: state.HeaderReducer }), null)(Navgation);

class Main extends Component {
  render() {
    const { HeaderReducer, changeLight, theme } = this.props;
    return (
      <div>
        <div className="logo">
          <img alt={'logo'} src={config.logo} />
          {!HeaderReducer.collapsed ? <span>{config.name}</span> : ''}
        </div>
        <NavgationRedux theme={theme} />
        <div className="switchtheme">
          <span><Icon type="bulb" />Switch Theme</span>
          {!HeaderReducer.collapsed ? <Switch onChange={changeLight} /> : ''}
        </div>
      </div>
    );
  }
}

export default connect(state =>
  ({ HeaderReducer: state.HeaderReducer, SiderReducer: state.SiderReducer }), SiderAction)(Main);
