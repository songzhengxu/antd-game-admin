import React from 'react';
import { Table, Spin, Select } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchDataIfNeed from '../../Action/GameListAction';

const Option = Select.Option;
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
    const display = record.gameList_guanlicaozuo.map(
      data => <Link to="/adsMobile" key={data + Math.random()} >{data}</Link>);
    const finalDisplay = [];
    for (let displayIndex = 0; displayIndex < display.length; displayIndex += 1) {
      finalDisplay.push(display[displayIndex]);
      if (displayIndex !== display.length - 1) {
        finalDisplay.push(' | ');
      }
    }
    return finalDisplay;
  },
}];
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

/*
testdata = {
    "code":"200",
    "data":{
      "list":[
      [100165,
      "幻城H5",
      "7a53f435ec3ce5eebf11f9263383e2ac",
      ["动作","角色"],
      "2017-05-02 17:53:39",
      "2017-05-02 18:13:36",
      "上线",
      ["编辑","新增资讯"]
      ],
      [100164,
      "御龙在天",
      "569ee2a3a2076b3a30646dc687624972",
      ["动作","角色"],
      "2017-05-02 17:51:00",
      "2017-05-05 12:18:47",
      "上线",
      ["编辑","新增资讯"]
      ],
      [100163,
      "群乐消online",
      "b98c561173284c42ccc94a1b98e04f95",
      ["闯关","网游"],
      "2017-04-28 14:22:24",
      "2017-04-28 14:26:04",
      "程序接入",
      ["编辑","新增资讯"]
      ],
      [100162,
      "传奇世界之仗剑天涯H5-测试",
      "b98c561173284c42ccc94a1b98e04f95",
      ["闯关","网游"],
      "2017-04-28 14:22:24",
      "2017-04-28 14:26:04",
      "程序接入",
      ["编辑","新增资讯"]
      ],
      [100161,
      "传奇世界之仗剑天涯H5",
      "b98c561173284c42ccc94a1b98e04f95",
      ["动作","网游"],
      "2017-04-28 11:41:14",
      "2017-05-02 18:13:59",
      "上线",
      ["编辑","新增资讯"]
      ]
      ],
      "shaixuanzhuangtai": ['全部状态', "程序接入", "上线", '下线'],
      "shaixuanyouxileixing": ['全部类型', '动作', '角色', '闯关', '网游']
      },
    "msg":"成功获取信息"
}
*/

const Selector = function Selector(props) {
  const options = props.options;
  const dynamicOpiton = options.map(option =>
    <Option key={option} value={option}>{ option }</Option>);
  return (
    <span>
      {props.children}:
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
  );
};

class GameList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeed('api/games.json'));
  }
  render() {
    const { data } = this.props.gameList;
    // console.log(this.props.gameList);
    if (data) {
      const { filterWord } = this.props.gameList;
      let dataSource;
      if (!filterWord.need) {
        dataSource = dataFormatTrans(data.list);
      }
      const shaixuanzhuangtai = data.shaixuanzhuangtai;
      const shaixuanyouxileixing = data.shaixuanyouxileixing;
      return (
        <div className="gameListTable">
          <Selector options={shaixuanzhuangtai} >状态</Selector>
          <Selector options={shaixuanyouxileixing} >游戏类型</Selector>
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

// container
export default connect(state => ({ gameList: state.GameManagement.gameList }))(GameList);
