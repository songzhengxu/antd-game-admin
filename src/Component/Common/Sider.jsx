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
          <MenuItem key="101">
            <Link to="/adsMobile">
              <Icon type="user" />
              {<span className="nav-text">首页轮播图（移动端）</span>}
            </Link>
          </MenuItem>
          <MenuItem key="201">
            <Link to="/adsMobile">
              <Icon type="user" />
              {<span className="nav-text">首页轮播图（PC端）</span>}
            </Link>
          </MenuItem>
          <MenuItem key="301">
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
            <Link to="/games">
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
        <MenuItem key="4" />
        <SubMenu
          key="connent"
          title="内容管理"
        >
          <MenuItem key="13">
            <Link to="/dataTable">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">专题管理</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="14">
            <Link to="/activityControl">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">活动管理</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="15">
            <Link to="/serviceControl">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">开服管理</span> : ''}
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="money"
          title="平台币管理"
        >
          <MenuItem key="16">
            <Link to="/grant">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">平台币发放</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="17">
            <Link to="/recharge">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">发放记录&充值管理</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="18">
            <Link to="/remaining">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">平台币余额列表</span> : ''}
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="network "
          title="网站管理"
        >
          <MenuItem key="19">
            <Link to="/networkInformation">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">网站信息</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="20">
            <Link to="/serviceInformation">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">客服信息</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="21">
            <Link to="/companyManagement">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">公司管理</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="22">
            <Link to="/networkPicture">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">网站图片设定</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="23">
            <Link to="/companyInformatio">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">公司信息配置</span> : ''}
            </Link>
          </MenuItem>
          <MenuItem key="24">
            <Link to="/blogroll">
              <Icon type="upload" />
              {!HeaderReducer.collapsed ? <span className="nav-text">友情链接</span> : ''}
            </Link>
          </MenuItem>
        </SubMenu>
        <MenuItem key="404">
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
