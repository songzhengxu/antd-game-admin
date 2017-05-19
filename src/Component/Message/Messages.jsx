import React from 'react';
import { Input, Button, Menu, Dropdown, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MakeTable from '../../utils/TableMaker';
import AsyncAction from '../../utils/asyncAction';


// MessageListTable
class MessageListTable extends React.Component {
  componentDidMount() {
    const messageListTabelAsyncAction = new AsyncAction('api/message.json', 'get', 'MessageListReducer', 'messageList', 'messageList');
    const { dispatch } = this.props;
    dispatch(messageListTabelAsyncAction.fetchDataIfNeed());
  }
  render() {
    const status = this.props.messageList.status;
    if (status === 'WAIT_FOR_FETCHING') {
      return (
        <div className="gamemessageListLoading">
          <Spin />
        </div>
      );
    }
    const dataSource = this.props.messageList.data;
    const data = {};
    data.title = {
      order: '序号',
      senderName: '发送方昵称',
      content: '内容',
      URL: 'URL',
      time: '时间',
      action: '操作',
    };
    data.dataSource = dataSource;
    const extrasConditionsmessageList = {
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
    return MakeTable(data, 'messageList_columns', 'messageList_datasource', extrasConditionsmessageList, { bordered: true });
  }
}
MessageListTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messageList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const MessageListTableContainer = connect(state =>
  ({ messageList: state.MessageListReducer.messageList }))(MessageListTable);


const Messages = function Messages() {
  return (
    <div className="messages">
      <div className="searchBar" >
        <span >内容：<Input
          style={{ width: 200, marginRight: 20 }}
          placeholder="请输入搜索信息"
        /><Button>搜索</Button></span>
      </div>
      <MessageListTableContainer />
    </div>
  );
};

export default Messages;
