import React, { Component } from 'react';
import { Icon, Menu, Switch } from 'antd';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import mockSiderMenusJson from '../../Mock/mockSiderMenus.json';
import config from '../../utils/config';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

/**
 * [arrayToTree cheng]
 * @type {[type]}
 */
class SiderMenu extends Component {

  render() {
    const { Views, theme } = this.props;
    const arrayToTree = function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
      const datas = lodash.cloneDeep(array);
      const result = [];
      const hash = {};
      datas.forEach((item) => {
        hash[item[id]] = item;
      });
      datas.forEach((item) => {
        const hashValue = hash[item[pid]];
        if (hashValue) {
          if (!hashValue[children]) {
            hashValue[children] = [];
          }
          hashValue[children].push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    };
    const menuTreeDatas = arrayToTree(mockSiderMenusJson.menus, 'id', 'mpid');
    const getMeunItems = function getMeunItems(menuTree) {
      return menuTree.map((item) => {
        if (item.children) {
          return (
            <SubMenu
              key={item.id}
              title={!Views.collapsed ? <span>{item.icon && <Icon type={item.icon} />}
                {item.name}</span> : <span>{item.icon && <Icon type={item.icon} />}</span>}
            >
              {getMeunItems(item.children)}
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
    };
    const menuItems = [getMeunItems(menuTreeDatas)];


    return (
      <div className="SilderMenu">
        <Menu
          defaultSelectedKeys={['1']}
          mode={!Views.collapsed ? 'inline' : 'vertical'}
          theme={theme} inlineIndent={!Views.collapsed ? '24' : '0'}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}

class Main extends Component {
  render() {
    const { Views, changeLight, theme } = this.props;
    return (
      <div>
        <div className="logo">
          <img alt={'logo'} src={config.logo} />
          {!Views.collapsed ? <span>{config.name}</span> : ''}
        </div>
        <SiderMenu {...this.props} theme={theme} />
        <div className="switchtheme">
          <span><Icon type="bulb" />Switch Theme</span>
          {!Views.collapsed ? <Switch defaultChecked={Views.light} onChange={changeLight} /> : ''}
        </div>
      </div>
    );
  }
}

export default Main;
