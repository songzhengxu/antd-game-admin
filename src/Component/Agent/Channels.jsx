import React, { Component } from 'react';
import { Button, Tabs, Modal, Input, DatePicker } from 'antd';
import axios from 'axios';
import TableOld from '../Ads/Tabel';

// import Mobile from '../Ads/Mobile';
import DropOption from '../Common/DropOption';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;


/**
 * [Component Table 的多态 只修改接口的申请就可以]
 * @type {[type]}
 */
class Table extends TableOld {
  constructor() {
    super();
    this.state = {
      visible: false,
      data: [],
      pagination: {},
      loading: false,
      selectedData: {},
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.fetch = this.fetch.bind(this);
  }


  getColumns() {
    return [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '注册时间',
      dataIndex: 'registerDate',
      key: 'registerDate',
    }, {
      title: '渠道编号',
      dataIndex: 'channelNumber',
      key: 'channelNumber',
    }, {
      title: '帐号',
      dataIndex: 'accounts',
      key: 'accounts',
    }, {
      title: '累计玩家',
      dataIndex: 'cumulativePlayers',
      key: 'cumulativePlayers',
    }, {
      title: '累计流水',
      dataIndex: 'flowAccumulation',
      key: 'flowAccumulation',
    }, {
      title: '累计分成',
      dataIndex: 'cumulativeDivide',
      key: 'cumulativeDivide',
    }, {
      title: '已提金额',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
    }, {
      title: '帐号余额',
      dataIndex: 'balance',
      key: 'balance',
    }, {
      title: '操作',
      dataIndex: 'control',
      key: 'control',
      render: (text, record) => <DropOption onMenuClick={e => this.handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '提现' }, { key: '3', name: record.isForbit ? '启用' : '禁用' }, { key: '4', name: '详情' }]} />,
    }, {
      title: '设定分成',
      dataIndex: 'settingDivide',
      key: 'settingDivide',
      render: (text, record) => <Button onClick={() => this.handleClick(record)}>设定分成</Button>,
    }];
  }

  handleClick() {
    this.props.handleSelect();
  }

  handleMenuClick(record, e) {
    if (e.key === '1') {
      // onEditItem(record);
      console.log(`编辑操作${record.key}`);
    } else if (e.key === '3') {
      const title = record.isForbit ? '是否禁用' : '是否启用';
      confirm({
        title,
        onOk() {
          // onDeleteItem(record.id);
        },
      });
    }
  }

  // TODO要按真实的接口去修改现在只是用api/get/ads/mobile的模拟接口
  fetch() {
    this.setState({ loading: true });
    axios.get('api/get/player/players')
    .then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: response,
        oldata: response,
        pagination,
      });
    });
  }

}

class Channels extends Component {
  constructor() {
    super();
    this.newTabIndex = 0;
    this.add = this.add.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    const panes = [
      { title: '渠道管理',
        content: <div className="summarizes">
          <div className="summarizes_selectBar">
            <span>帐号：<Input placeholder="请输入帐号" /></span>
            <span>注册时间：
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['Start Time', 'End Time']}
            />
            </span>
            <Button >搜索</Button>
          </div>
          <Button>添加渠道</Button><Table
            handleSelect={this.add}
          /></div>,
        key: '0',
        closable: false },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }


  onChange(activeKey) {
    this.setState({ activeKey });
    const removeActiveKey = this.state.panes[1].key;
    if (activeKey !== removeActiveKey) {
      this.remove(removeActiveKey);
      this.newTabIndex = 0;
    }
  }
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
  getPane(pane = { title: 'new tabs', content: <div>div</div>, key: '0', closable: true }) {
    return pane;
  }

  add() {
    const panes = this.state.panes;
    if (this.newTabIndex < 1) {
      const activeKey = `newTab${this.newTabIndex += 1}`;
      panes.push(this.getPane({ title: '分成设置', content: <div>123</div>, key: activeKey }));
      this.setState({ panes, activeKey });
    }
  }
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
    this.newTabIndex = 0;
  }

  render() {
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => <TabPane
          tab={pane.title} key={pane.key}
          closable={pane.closable}
        >{pane.content}</TabPane>)}
      </Tabs>
    );
  }

}

export default Channels;
