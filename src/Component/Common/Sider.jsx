import React, { Component } from 'react';
import { Icon, Menu, Switch } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SiderAction from '../../Action/SiderAction';

import config from '../../utils/config';

const SubMenu = Menu.SubMenu;


class Nav extends Component {
  render() {
    const { HeaderReducer, theme } = this.props;
    return (
      <Menu mode="inline" theme={theme} inlineIndent={!HeaderReducer.collapsed ? '24' : '0'} defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/advertisementMobile">
            <Icon type="user" />
            {!HeaderReducer.collapsed ? <span className="nav-text">nav 1</span> : ''}
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/">
            <Icon type="video-camera" />
            {!HeaderReducer.collapsed ? <span className="nav-text">HomePage</span> : ''}
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/login">
            <Icon type="upload" />
            {!HeaderReducer.collapsed ? <span className="nav-text">Login</span> : ''}
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub4"
          title={<span><Icon type="setting" /><span>游戏管理</span></span>}
        >
          <Menu.Item key="9">
            <Link to="/gameList">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">游戏列表</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/addGame">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">添加游戏</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/gameNews">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">游戏资讯</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/gameType">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">游戏类型</span> : ''}
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="connent"
          title="内容管理"
        >
          <Menu.Item key="13">
            <Link to="/ContentTable">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">专题管理</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link to="/activityControl">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">活动管理</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link to="/serviceControl">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">开服管理</span> : ''}
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="money"
          title="平台币管理"
        >
          <Menu.Item key="16">
            <Link to="/grant">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">平台币发放</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="17">
            <Link to="/recharge">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">发放记录&充值管理</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="18">
            <Link to="/remaining">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">平台币余额列表</span> : ''}
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="network "
          title="网站管理"
        >
          <Menu.Item key="19">
            <Link to="/networkInformation">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">网站信息</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="20">
            <Link to="/serviceInformation">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">客服信息</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="21">
            <Link to="/companyManagement">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">公司管理</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="22">
            <Link to="/networkPicture">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">网站图片设定</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="23">
            <Link to="/companyInformatio">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">公司信息配置</span> : ''}
            </Link>
          </Menu.Item>
          <Menu.Item key="24">
            <Link to="/blogroll">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">友情链接</span> : ''}
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4">
          <Link to="/dada">
            <Icon type="upload" />
            {!HeaderReducer.collapsed ? <span className="nav-text">不存在的链接</span> : ''}
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const NavRedux = connect(state => ({ HeaderReducer: state.HeaderReducer }), null)(Nav);

class Main extends Component {
  render() {
    const { HeaderReducer, changeLight, theme } = this.props;
    return (
      <div>
        <div className="logo">
          <img alt={'logo'} src={config.logo} />
          {!HeaderReducer.collapsed ? <span>{config.name}</span> : ''}
        </div>
        <NavRedux theme={theme} />
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
