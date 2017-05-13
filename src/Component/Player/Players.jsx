import React, { Component } from 'react';
import { Button, Input, Icon, Tabs } from 'antd';
import axios from 'axios';
import TableOld from '../Ads/Tabel';

// import Mobile from '../Ads/Mobile';
import DropOption from '../Common/DropOption';


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
      searchText: '',
      filtered: false,
      filterDropdownVisible: false,
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.fetch = this.fetch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  onInputChange(e) {
    this.setState({ searchText: e.target.value });
  }
  onSearch() {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.state.data.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }

  getColumns() {
    return [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={1}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
),
      filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible },
        () => this.searchInput.focus()),
    }, {
      title: '注册时间',
      dataIndex: 'registerDate',
      key: 'registerDate',
    }, {
      title: '登录设备',
      dataIndex: 'device',
      key: 'device',
    }, {
      title: '玩家ID',
      dataIndex: 'playerID',
      key: 'playerID',
    }, {
      title: '帐号',
      dataIndex: 'accounts',
      key: 'accounts',
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: '帐号类型',
      dataIndex: 'accountTypev',
      key: 'accountType',
    }, {
      title: '注册渠道|游戏',
      dataIndex: 'registeredChannelsAndGame',
      key: 'registeredChannelsAndGame',
    }, {
      title: '玩家状态',
      dataIndex: 'playerStatus',
      key: 'playerStatus',
    }, {
      title: '登录IP',
      dataIndex: 'loginIP',
      key: 'loginIP',
    }, {
      title: '最近登录游戏',
      dataIndex: 'currentGame',
      key: 'currentGame',
    }, {
      title: '操作',
      dataIndex: 'control',
      key: 'control',
      render: (text, record) => <DropOption onMenuClick={e => this.handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: record.isForbit ? '解禁' : '禁用' }]} />,
    }];
  }

  handleMenuClick(record, e) {
    if (e.key === '1') {
      // onEditItem(record);
      this.props.handleSelect();
      console.log(`编辑操作${record.key}`);
    } else if (e.key === '2') {
      confirm({
        title: record.isForbit ? '是否禁用' : '是否启用',
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
        pagination,
      });
    });
  }

}

class Players extends Component {
  constructor() {
    super();
    this.newTabIndex = 0;
    this.add = this.add.bind(this);
    const panes = [
      { title: '玩家列表',
        content: <Table
          handleSelect={this.add}
        />,
        key: '1',
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
    }
  }
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
  getPane(pane = { title: 'new tabs', content: <div>div</div>, key: '0', closable: true }) {
    return [pane];
  }

  add() {
    const panes = this.state.panes;
    if (this.newTabIndex < 1) {
      const activeKey = `newTab${this.newTabIndex += 1}`;
      panes.push(this.getPane({ title: '用户修改', content: 'Content of new Tab', key: activeKey }));
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

export default Players;
