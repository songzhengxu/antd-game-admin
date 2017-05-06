const data = {};
data.gameList = {};
data.gameList.columns = [{
  title: '序号',
  dataIndex: 'xuhao',
}, {
  title: '游戏名称',
  dataIndex: 'youximingcheng',
}, {
  title: 'Appkey',
  dataIndex: 'appkey',
}, {
  title: '游戏类型',
  dataIndex: 'youxileixing',
}, {
  title: '添加时间',
  dataIndex: 'tianjiashijian',
}, {
  title: '上线时间',
  dataIndex: 'shangxianshijian',
}, {
  title: '当前状态',
  dataIndex: 'dangqianzhuangtai',
}, {
  title: '管理操作',
  dataIndex: 'guanlicaozuo',
}];

data.gameList.dataSource = [{
  xuhao: '1',
  youximingcheng: 'John Brown',
  youxileixing: '￥300,000.00',
  appkey: 'New York No. 1 Lake Park',
  shangxianshijian: 1212,
  tianjiashijian: 1212,
  dangqianzhuangtai: 121212,
  guanlicaozuo: 454545,
}];

const GameManagement = function GameManagement(state = data, action) {
  switch (action.type) {
    case 'INPUT_ON_CHANGE':
      return action.inputValue;
    default:
      return state;
  }
};

export default GameManagement;
