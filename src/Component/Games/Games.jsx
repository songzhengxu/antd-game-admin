// 引入antd, redux, react路由组件
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// 引入 fetchDataIfNeed 方法，用于异步拉取数据
import fetchDataIfNeed from '../../Action/Games/games';

const Option = Select.Option;

// 确定表头
const columns = [{
  title: '序号',
  dataIndex: 'gameList_xuhao',
}, {
  title: '游戏名称',
  dataIndex: 'gameList_youximngcheng',
  render: (text, record) => <a>{record.gameList_youximngcheng}</a>,
}, {
  title: 'APPKEY',
  dataIndex: 'gameList_APPKEY',
}, {
  title: '游戏类型',
  dataIndex: 'gameList_youxileixing',
  render: (text, record) => {
    const display = record.gameList_youxileixing.join(' | ');
    return display;
  },
}, {
  title: '添加时间',
  dataIndex: 'gameList_tianjiashijian',
}, {
  title: '上线时间',
  dataIndex: 'gameList_shangxianshijian',
}, {
  title: '当前状态',
  dataIndex: 'gameList_dangqianzhuangtai',
}, {
  title: '管理操作',
  dataIndex: 'gameList_guanlicaozuo',
  render: (text, record) => {
    // 根据传入的参数生成一个Link数组
    const display = record.gameList_guanlicaozuo.map(
      data => <Link to="/adsMobile" key={data + Math.random()} >{data}</Link>);
      // 声明一个数组
    const finalDisplay = [];
    // 遍历上卖弄的Link 数组， 并将Link数组种的元素，和 | 符号push进去
    for (let displayIndex = 0; displayIndex < display.length; displayIndex += 1) {
      finalDisplay.push(display[displayIndex]);
      // 如果游标非处于数组中的最后一个位置，则Push一个 | 用于展示
      if (displayIndex !== display.length - 1) {
        finalDisplay.push(' | ');
      }
    }
    return finalDisplay;
  },
}];

// 将回传回来的数组数据，根据columns的 dataIndex参数进行转换, 转换成Table可以用的数组
/**
 * [dataFormatTrans 数据转换方法]
 * @param  {[Array]} sourceData [数据数组]
 * @return {[Array]}            [可直接放入dataSource参数的的数组]
 */
const dataFormatTrans = function dataFormatTrans(sourceData) {
  const dataSource = [];
  for (let dataIndex = 0; dataIndex < sourceData.length; dataIndex += 1) {
    const dataSourceData = {};
    for (let columnsIndex = 0; columnsIndex < columns.length; columnsIndex += 1) {
      dataSourceData[columns[columnsIndex].dataIndex] = sourceData[dataIndex][columnsIndex];
      dataSourceData.key = columns[columnsIndex].dataIndex + dataIndex;
    }
    dataSource.push(dataSourceData);
  }
  return dataSource;
};

// 搜索栏组件
const Selector = function Selector(props) {
  const options = props.options;
  // 根据参数动态生成搜索栏的option
  const dynamicOpiton = options.map(option =>
    <Option key={option} value={option}>{ option }</Option>);
  console.log('dynamicOpiton');
  console.log(dynamicOpiton);
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
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.String,
};

class GameList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeed('api/games.json'));
  }
  render() {
    console.log('0000');
    console.log(Selector);
    const { data } = this.props.gameList;
    // 通过判断数据是否存在来确定显示内容
    if (data) {
      // 判断返回的数据中是否带有筛选选项
      const { filterWord } = this.props.gameList;
      let dataSource;
      if (!filterWord.need) {
        dataSource = dataFormatTrans(data.list);
      }

      // 生成筛选竹竿太的fitlers参数
      const shaixuanzhuangtaiFilter = data.shaixuanzhuangtai.map(zhuangtai =>
        ({ text: zhuangtai, value: zhuangtai }));
      // 生成筛选 游戏类型的filters参数
      const shaixuanyouxileixingFilter = data.shaixuanyouxileixing.map(leixing =>
          ({ text: leixing, value: leixing }));
      // 对特定的行添加筛选参数和筛选方法
      columns[3].filters = shaixuanyouxileixingFilter;
      columns[3].onFilter = (value, record) => {
        console.log('');
        return (value === '全部类型') ? record.gameList_youxileixing : record.gameList_youxileixing.includes(value);
      };
      columns[3].filterMultiple = false;
      columns[6].filters = shaixuanzhuangtaiFilter;
      columns[6].onFilter = (value, record) => {
        console.log('');
        return (value === '全部状态') ? record.gameList_dangqianzhuangtai : record.gameList_dangqianzhuangtai.includes(value);
      };
      columns[6].filterMultiple = false;

      // 后去筛选状态和筛选游戏类型的参数，用于下面生成Selector
      const shaixuanzhuangtai = data.shaixuanzhuangtai;
      const shaixuanyouxileixing = data.shaixuanyouxileixing;
      return (
        <div className="gameListTable">
          <div className="gameList_selectBar" >
            <Selector options={shaixuanzhuangtai} >{'状态'}</Selector>
            <Selector options={shaixuanyouxileixing} >{'游戏类型'}</Selector>
            <span className="ganmeList_searchGameName">{'游戏名称：'}<Input /></span>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            bordered
          />
        </div>
      );
    }
    return (
      <div className="gameListLoading">
        <Spin />
      </div>
    );
  }

}

GameList.propTypes = {
  dispatch: PropTypes.func,
  gameList: PropTypes.shape({
    data: PropTypes.objectOf(PropTypes.array),
    status: PropTypes.string,
    filterWord: PropTypes.shape({
      need: PropTypes.bool,
      shaixuanzhuangtai: PropTypes.arrayOf(PropTypes.string),
      shaixuanyouxileixing: PropTypes.arrayOf(PropTypes.string),
      shaixuanyouximingcheng: PropTypes.string,
    }),
  }),
};

// container
export default connect(state => ({ gameList: state.GameManagement.gameList }))(GameList);
