import React from 'react';
import { Input, Button, Menu, Dropdown, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
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
    let dataSource = this.props.messageList.data;
    let contentFilter = this.props.contentFilter;
    const current = this.props.current;
    const pageSize = this.props.pageSize;
    const pageChange = this.props.pageChange;
    const pageSizeChange = this.props.pageSizeChange;
    contentFilter = contentFilter.trim();
    if (contentFilter !== '') {
      dataSource = dataSource.filter(data => data.content.indexOf(contentFilter) !== -1);
    }
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
    const total = dataSource.length;
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
    return MakeTable(data,
      'messageList_columns',
      'messageList_datasource',
      extrasConditionsmessageList,
      { bordered: true,
        pagination: {
          defaultPageSize: pageSize,
          defaultCurrent: current,
          total,
          showSizeChanger: true,
          pageSizeOptions: ['1', '2'],
          onChange: (page, size) => pageChange(page, size),
          onShowSizeChange: (currentpage, size) => pageSizeChange(currentpage, size),
        },
      },
    );
  }
}
MessageListTable.propTypes = {
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChange: PropTypes.func.isRequired,
  pageSizeChange: PropTypes.func.isRequired,
  contentFilter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  messageList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const MessageListTableContainer = connect(state =>
  ({ messageList: state.MessageListReducer.messageList }))(MessageListTable);

class Messages extends React.Component {
  constructor(props) {
    super(props);
    const search = this.props.location.search;
    const queryStringObjcet = queryString.parse(search);
    this.state = {
      inputContent: '',
      contentFilter: queryStringObjcet.content ? queryStringObjcet.content : '',
      pageSize: queryStringObjcet.pageSize ? Number.parseInt(queryStringObjcet.pageSize, 10) : 1,
      current: queryStringObjcet.nowPage ? Number.parseInt(queryStringObjcet.nowPage, 10) : 1,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.changHistory = this.changHistory.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.pageSizeChange = this.pageSizeChange.bind(this);
  }
  onChangeHandler(event) {
    const inputContent = event.target.value;
    this.setState({ inputContent });
  }
  changHistory() {
    const inputContent = this.state.inputContent;
    const pageSize = this.state.pageSize;
    const url = {};
    if (inputContent.trim() !== '') {
      url.content = inputContent;
    }
    if (pageSize !== 1) {
      url.pageSize = pageSize;
    }
    this.props.history.push(`messages?${queryString.stringify(url)}`);
    const state = this.state;
    state.contentFilter = inputContent;
    // 搜索后强制跳回第一页。
    state.current = 1;
    this.setState({ state });
  }
  pageChange(current, size) {
    // 页面刷新第一次
    const content = this.state.contentFilter;
    const url = {};
    if (content.trim() !== '') {
      url.content = content;
    }
    if (current !== 1) {
      url.nowPage = current;
    }
    if (size !== 1) {
      url.pageSize = size;
    }
    this.props.history.push(`messages?${queryString.stringify(url)}`);
    const state = this.state;
    state.current = current;
    // 通过setState强制刷新组件,保持state，改变前组件，和改变后组件状态一致
    this.setState({ state });
  }
  pageSizeChange(current, size) {
    const content = this.state.contentFilter;
    const url = {};
    if (content.trim() !== '') {
      url.content = content;
    }
    if (current !== 1) {
      url.nowPage = current;
    }
    if (size !== 1) {
      url.pageSize = size;
    }
    this.props.history.push(`messages?${queryString.stringify(url)}`);
    const state = this.state;
    state.pageSize = size;
    this.setState({ state });
  }
  render() {
    const inputContent = this.state.inputContent;
    const contentFilter = this.state.contentFilter;
    const pageSize = this.state.pageSize;
    const current = this.state.current;
    const pageChange = this.pageChange;
    const pageSizeChange = this.pageSizeChange;
    return (
      <div className="messages">
        <div className="searchBar" >
          <span >内容：<Input
            style={{ width: 200, marginRight: 20 }}
            onChange={event => this.onChangeHandler(event)}
            value={inputContent}
            placeholder="请输入搜索信息"
          /><Button onClick={this.changHistory} >搜索</Button></span>
        </div>
        <MessageListTableContainer
          contentFilter={contentFilter}
          pageSize={pageSize}
          current={current}
          pageChange={pageChange}
          pageSizeChange={pageSizeChange}
        />
      </div>
    );
  }
}
Messages.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.stirng,
    push: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.stirng,
      push: PropTypes.func,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    block: PropTypes.func,
  }).isRequired,
};

export default Messages;
