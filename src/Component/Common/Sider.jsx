import React, { Component } from 'react';
import { Icon, Menu, Switch } from 'antd';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import mockSiderMenusJson from '../../Mock/mockSiderMenus.json';
import config from '../../utils/config';
import SiderToggleLightAction from '../../Action/SiderAction';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class SiderMenu extends Component {
  // componentDidMount() {
  //   console.log(mockSiderMenusJson);
  //   const { dispatch } = this.props;
  //   dispatch(fetchDataIfNeed('api/get/sider/menus'));
  // }
  render() {
    const { HeaderReducer, theme } = this.props;
    // array 类型转换为 tree 类型
    // if (!SiderReducer.gameMenus.data) {
    //   return (
    //     <div className="gameListLoading">
    //       <Spin />
    //     </div>
    //   );
    // }
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
              title={!HeaderReducer.collapsed ? <span>{item.icon && <Icon type={item.icon} />}
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
          mode={!HeaderReducer.collapsed ? 'inline' : 'vertical'}
          theme={theme} inlineIndent={!HeaderReducer.collapsed ? '24' : '0'}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}
const SilderMenuRedux = connect(state =>
  ({ HeaderReducer: state.HeaderReducer, SiderReducer: state.SiderReducer }))(SiderMenu);


class Main extends Component {
  render() {
    const { HeaderReducer, changeLight, theme } = this.props;
    return (
      <div>
        <div className="logo">
          <img alt={'logo'} src={config.logo} />
          {!HeaderReducer.collapsed ? <span>{config.name}</span> : ''}
        </div>
        <SilderMenuRedux theme={theme} />
        <div className="switchtheme">
          <span><Icon type="bulb" />Switch Theme</span>
          {!HeaderReducer.collapsed ? <Switch onChange={changeLight} /> : ''}
        </div>
      </div>
    );
  }
}

export default connect(state =>
  ({ HeaderReducer: state.HeaderReducer, SiderReducer: state.SiderReducer }),
  SiderToggleLightAction)(Main);
