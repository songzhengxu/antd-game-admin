import React, { Component } from 'react';
import { Icon, Menu, Switch } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import mockSiderMenusJson from '~/Mock/mockSiderMenus.json';
import config from '~/utils/config';
import { Tool } from '~/utils/Tool';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

/**
 * [menuTreeDatas 侧边栏菜单组件]
 * @type {[type]}
 */
class SiderMenu extends Component {
  getMeunItems(menuTree, collapsed) {
    return menuTree.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={!collapsed ? <span>{item.icon && <Icon type={item.icon} />}
              {item.name}</span> : <span>{item.icon && <Icon type={item.icon} />}</span>}
          >
            {this.getMeunItems(item.children, collapsed)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={item.id} >
          <Link to={item.router}>
            {item.icon && <Icon type={item.icon} />}
            {item.name}
          </Link>
        </MenuItem>
      );
    });
  }

  render() {
    const { Views, theme, mockSiderMenusJsonMenus } = this.props;
    const { collapsed } = Views;

    // 过滤需要隐藏的菜单
    // const filterMenus = lodash.cloneDeep(mockSiderMenusJsonMenus)
    // .filter(value => value.isHidden === false);
    // console.log(filterMenus);

    // 把数组转树形菜单
    const menuTreeDatas = Tool.arrayToTree(mockSiderMenusJsonMenus, 'id', 'mpid');
    const menuItems = [this.getMeunItems(menuTreeDatas, collapsed)];
    return (
      <div className="SilderMenu">
        <Menu
          defaultSelectedKeys={['1']}
          mode={!collapsed ? 'inline' : 'vertical'}
          theme={theme} inlineIndent={!collapsed ? '24' : '0'}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}


SiderMenu.propTypes = {
  Views: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  mockSiderMenusJsonMenus: PropTypes.arrayOf(PropTypes.object),
};
SiderMenu.defaultProps = {
  mockSiderMenusJsonMenus: [],
};

/**
 * [className 导出整个侧边栏组件 由logo区域，导航区域和底部操作三部分组成]
 * @type {String}
 */
class Main extends Component {
  render() {
    const { Views, changeLight, theme } = this.props;
    const { collapsed, light } = Views;
    return (
      <div>
        <div className="logo">
          <img alt={'logo'} src={config.logo} />
          {!collapsed ? <span>{config.name}</span> : ''}
        </div>
        <SiderMenu {...this.props} theme={theme} />
        <div className="switchtheme">
          <span><Icon type="bulb" />Switch Theme</span>
          {!collapsed ? <Switch defaultChecked={light} onChange={changeLight} /> : ''}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  Views: React.PropTypes.object.isRequired,
  changeLight: React.PropTypes.func.isRequired,
  theme: React.PropTypes.string.isRequired,
};

export default Main;
