import React from 'react';
import { Input, Button, Menu, Dropdown } from 'antd';
import MakeTable from '../../utils/TableMaker';

const data = {};
data.title = {
  order: '序号',
  senderName: '发送方昵称',
  content: '内容',
  URL: 'URL',
  time: '时间',
  action: '操作',
};
data.dataSource = [
  {
    order: 2,
    senderName: '游戏平台',
    content: '平台官方群2370500',
    URL: 'http://h5.jimugame.com/zx/detail/id/368/appid/100164',
    time: '2017-05-09',
    action: ['编辑', '删除'],
  },
  {
    order: 3,
    senderName: '游戏平台',
    content: '御龙在天福利资讯',
    URL: 'http://h5.jimugame.com/zx/detail/id/368/appid/100164',
    time: '2017-05-09',
    action: ['编辑', '删除'],
  },
];

const extrasConditions = {
  action: {
    render: (text, record) => {
      const menuUnit = record.action.map((value, index) =>
        <Menu.Item key={value + index}>{value}</Menu.Item>);
      const menu = (
        <Menu>
          {menuUnit}
        </Menu>
      );
      const dropDownMenu = (
        <Dropdown.Button overlay={menu} >
          操作
        </Dropdown.Button>
      );
      return dropDownMenu;
    },
  },
};

const MessagesTable = function MessagesTable() {
  return MakeTable(data, 'Rbac_columns', 'Rbac_datasource', extrasConditions, { bordered: true });
};

const Messages = function Messages() {
  return (
    <div className="messages">
      <div className="searchBar" >
        <span >内容：<Input
          style={{ width: 200, marginRight: 20 }}
          placeholder="请输入搜索信息"
        /><Button>搜索</Button></span>
      </div>
      <MessagesTable />
    </div>
  );
};

export default Messages;
