
import React from 'react';
import { Select, DatePicker, Input } from 'antd';
import PropTypes from 'prop-types';
import MakeTable from '../../utils/TableMaker';

const Option = Select.Option;
const { RangePicker } = DatePicker;

const data = {};
data.title = {
  order: '序号',
  time: '时间',
  gameID: '游戏ID',
  gameName: '游戏名称',
  type: '类型',
  title: '标题',
  top: '是否置顶',
  action: '操作',
};
data.dataSource = [
  {
    order: 367,
    time: '2017-05-04',
    gameID: 100164,
    gameName: '御天传奇',
    type: '攻略',
    title: '只要998,吕布带回家',
    top: '不置顶',
    action: ['置顶', '编辑', '删除'],
  },
  {
    order: 365,
    time: '2017-05-04',
    gameID: 100164,
    gameName: '御天传奇',
    type: '攻略',
    title: '《御天传奇》充值技巧全曝光',
    top: '不置顶',
    action: ['置顶', '编辑', '删除'],
  },
  {
    order: 364,
    time: '2017-05-04',
    gameID: 100164,
    gameName: '御天传奇',
    type: '攻略',
    title: '老司机带你玩转《御天传奇H5》',
    top: '置顶',
    action: ['取消置顶', '编辑', '删除'],
  },
];

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
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.string.isRequired,
};

const SearchBar = function SearchBar() {
  return (
    <div className="gameInfromation_searchBar">
      <Selector options={['全部', '新闻', '攻略']}>类型</Selector>
      <span >时间： <RangePicker /></span>
      <span>标题关键字： <Input style={{ width: 200 }} placeholder="请输入关键字" /></span>
    </div>
  );
};

const GameInformation = function GameInformation() {
  return (
    <div>
      <SearchBar />
      {MakeTable(data, 'information_columns', 'information_datasource', {}, { bordered: true })}
    </div>
  );
};

export default GameInformation;
