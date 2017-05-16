import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Table, Select, Modal } from 'antd';


const confirm = Modal.confirm;

  // TODO 这里用的是本地数据需要更改为服务端请求
const mockDataFirst = { index: 1, gameId: '1', gameName: '1', thumbnail: 'http://placeholder.qiniudn.com/20x40' };
const mockDataTwo = { index: 2, gameId: '2', gameName: '2', thumbnail: 'http://placeholder.qiniudn.com/20x40' };
class TabelComponent extends Component {
  constructor() {
    super();
    this.state = {
      pagination: {},
    };
  }


  /**
   * [getColumns 获取 columns 可覆盖用于多态]
   * @return {[Array]} [description]
   */
  getColumns() {
    return [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '游戏ID',
      dataIndex: 'gameId',
      key: 'gameId',
    }, {
      title: '游戏名称',
      dataIndex: 'gameName',
      key: 'gameName',
    }, {
      title: '图片缩略图',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: src => <img src={src} width="20" height="20" className="App-logo" alt="logo" />,
    }, {
      title: '操作',
      dataIndex: 'controler',
      key: 'controler',
      render: (text, record) => <Button onClick={() => this.handleClick(record)}>删除</Button>,
    }];
  }
  handleClick(record) {
      // onEditItem(record);
    confirm({
      title: '确定要删除吗?',
      onOk() {
          // onDeleteItem(record.id);
      },
    });
    this.props.handleSelect(record);
    console.log(`编辑操作${record.index}`);
  }


  handleTableChange(pagination) {
    const paper = { ...this.status.pagination };
    paper.current = pagination.current;
    this.setState({
      pagination: paper,
    });
  }


  render() {
    const columns = this.getColumns();
    const data = this.props.data;
    return (
      <Table
        bordered columns={columns} dataSource={data}
        pagination={this.pagination}
        onChange={this.handleTableChange}
      />

    );
  }
}

// 搜索栏组件
const Selector = function Selector(props) {
  const options = props.options;
  // 根据参数动态生成搜索栏的option
  const dynamicOpiton = options.map(option =>
    <Option key={option} value={option}>{ option }</Option>);
  return (
    <span className="gameList_selector" >
      {props.children} :
      <span className="gameList_selector_unit">
        <Select
          mode="tags"
          showSearch
          style={{ width: 200 }}
          placeholder=" 请选择 "
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.value.indexOf(input) >= 0}
        >
          {dynamicOpiton}
        </Select>
      </span>
    </span>
  );
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.String,
};


class Qualities extends Component {
  constructor() {
    super();
    this.state = {
      data: [mockDataFirst, mockDataTwo],
      visible: false,
      selectedData: {},
    };
    this.fetch = this.fetch.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
    this.fetch();
  }


  /**
   * [showModal 使 WarppedCreateModal 改为展示状态]
   * @return {[type]} [description]
   */
  showModal() {
    this.setState({ visible: true });
  }
  /**
   * [handleCancel  WarppedCreateModal cancel 时触发的事件 把表单清空]
   * @return {[type]} [description]
   */
  handleCancel() {
    const form = this.form;
    form.resetFields();
    this.setState({ selectedData: {}, visible: false });
  }
  /**
   * [handleCreate 使 WarppedCreateModal onOk触发事件]
   * @return {[type]} [description]
   */

  saveFormRef(form) {
    this.form = form;
  }


  /**
   * [handleSelect Tabel选择编辑时调用的方法]
   * @param  {[Object]} selectedData [选择中的对应tabelItem中的数据]
   * @return {[type]}              [description]
   */
  handleSelect(selectedData) {
    this.setState({ selectedData });
  }
  fetch() {
    // this.setState({ loading: true });
    this.setState({ loading: false });
    axios.get('api/get/player/editor')
    .then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  render() {
    const gamesName = ['全部', '1', '2', '3'];
    return (<div className="summarizes">
      <div className="summarizes_selectBar">
        <span><Selector options={gamesName} >游戏</Selector></span>
        <Button >添加+</Button>
      </div>
      <TabelComponent
        data={this.state.data}
        showModal={this.showModal}
        handleSelect={this.handleSelect}
      />
    </div>);
  }
}

export default Qualities;
