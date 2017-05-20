import React, { Component } from 'react';
import axios from 'axios';
import { Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import DropOption from '../Common/DropOption';
import editor from '../Content/Editor';

const confirm = Modal.confirm;

/**
 * 生成表格
 * @type {class}
 */
class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      selectedData: {},
    };
    this.fetch = this.fetch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  /**
   * [handleSelect Tabel选择编辑时调用的方法]
   * @param  {[Object]} selectedData [选择中的对应tabelItem中的数据]
   * @return {[type]}              [description]
   */
  handleSelect(selectedData) {
    this.setState({ selectedData });
  }
  /**
   * 判断操作按钮发生对应的操作
   * @param  {[type]} record [列表数据]
   * @param  {[type]} event  [事件]
   */
  handleMenu(record, event) {
    const { history } = this.props;
    if (event.key === '1') {
      history.push(`/content/subjects/editor?id=${record.index}`);
      this.handleSelect(record);
    } else if (event.key === '2') {
      console.log(`编辑游戏列表${record.key}`);
    } else if (event.key === '3') {
      confirm({
        title: 'Are you delect this record?',
        onOk() {
          console.log(`删除${record.key}`);
        },
      });
    }
  }
  /**
   * [获取数据，返回数据]
   */
  fetch() {
    this.setState({ loading: true });
    axios.get('api/content/subject')
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
/**
 * [handleTableChange 切换页数]
 * @param  {[Number]} pagination [页数]
 */
  handleTableChange(pagination) {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  }
  /**
   * [render 渲染]
   * @return {[html]} [标签模版]
   */
  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '图片',
      dataIndex: 'pictureUrl',
      key: 'pictureUrl',
      render: (text, record) => <img style={{ width: '40' }} alt={record.name} src={text} />,
    }, {
      title: '是否热门',
      dataIndex: 'isHot',
      key: 'isHot',
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '编辑专题' }, { key: '2', name: '编辑游戏列表' }, { key: '3', name: '删除' }]} /> },
    ];
    return (
      <div>
        <Link to="/content/subjects/editor">
          <button className="add-subject">添加专题</button>
        </Link>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={{ defaultPageSize: 10 }}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        <editor
          item={this.state.selectedData}
        />
      </div>
    );
  }

}
DataTable.propTypes = {
  history: React.PropTypes.object.isRequired,
};


export default DataTable;
