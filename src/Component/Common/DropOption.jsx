import React from 'react';
import { Dropdown, Button, Icon, Menu } from 'antd';

/**
 * [DropOption 下拉菜单封装,用于表格最后一栏的操作栏]
 * @param {[type]} onMenuClick      [点击回调]
 * @param {Array}  [menuOptions=[]] [菜单配置选项]
 * @param {[type]} buttonStyle      [按钮样式]
 * @param {[type]} dropdownProps    [description]
 */
const DropOption = ({ onMenuClick, menuOptions = [], buttonStyle, dropdownProps }) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>);
  return (<Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      <Icon style={{ marginRight: 2 }} type="bars" />
      <Icon type="down" />
    </Button>
  </Dropdown>);
};


export default DropOption;
