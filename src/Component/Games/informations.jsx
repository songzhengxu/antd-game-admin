
import React from 'react';
import { Select, DatePicker, Input, Menu, Dropdown, Button, Tabs, Form, Upload, Radio, Icon, Modal, Spin } from 'antd';
import LzEditor from 'react-lz-editor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MakeTable from '../../utils/TableMaker';
import AsyncAction from '../../utils/asyncAction';

const informationAsyncAction = new AsyncAction('api/gamesInformation.json', 'get', 'GameInformationReducer', 'informationList', 'informationList');

const Option = Select.Option;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Selector = function Selector(props) {
  console.log('8888');
  console.log(props);
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
      <span><Button>搜索</Button></span>
    </div>
  );
};

// InformationTable写一个
class InformationTable extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(informationAsyncAction.fetchDataIfNeed());
  }
  render() {
    const status = this.props.informationList.status;
    if (status === 'WAIT_FOR_FETCHING') {
      return (
        <div className="gameinformationListLoading">
          <Spin />
        </div>
      );
    }
    const dataSource = this.props.informationList.data;
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
    data.dataSource = dataSource;
    const extrasConditionsInfromationList = {
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
    return MakeTable(data, 'information_columns', 'information_datasource', extrasConditionsInfromationList, { bordered: true });
  }
}
InformationTable.propTypes = {
  dispatch: PropTypes.func,
  informationList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const InformationTableContainer = connect(state =>
  ({ informationList: state.GameInformationReducer.informationList }))(InformationTable);

const GameInformation = function GameInformation() {
  return (
    <div>
      <SearchBar />
      <InformationTableContainer />
    </div>
  );
};

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
    const filed = this.props.id;
    this.props.setFieldsValue({ [filed]: { fileList } });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= this.props.limit ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

PicturesWall.propTypes = {
  id: PropTypes.string.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // 发送异步请求
        // 等待异步请求返回状态码
        // 改变gamelst数据状态为refresh
        // 跳转到games页面
        this.props.history.push('/games/games');
      }
      console.log(err);
    });
  }
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render() {
    const { getFieldDecorator, setFieldsValue, getFieldValue } = this.props.form;
    // const youximingchengError = isFieldTouched('userName') && getFieldError('userName');
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          label="游戏名称"
          hasFeedback
        >
          {getFieldDecorator('addInformations_gameName', {
            rules: [{ required: true, message: '请选择游戏名称' }],
          })(
            <Selector options={['精灵比卡丘', '吉姆战棋', '御天传奇']}>类型</Selector>,
          )}
        </FormItem>
        <FormItem label="资讯类型" >
          {getFieldDecorator('addInformations_informationType', {
            rules: [{ required: true, message: '请选择资讯类型' }],
          })(
            <RadioGroup>
              <Radio value={1}>新闻</Radio>
              <Radio value={2}>攻略</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="标题" hasFeedback >
          {getFieldDecorator('addInformations_title', {
            rules: [{ required: true, message: '请输入标题' }],
          })(
            <Input
              placeholder="请输入标题"
            />,
          )}
        </FormItem>
        <FormItem label="关键字" hasFeedback >
          {getFieldDecorator('addInformations_keywords', {
            rules: [{ required: true, message: '请输入关键字' }],
          })(
            <Input
              placeholder="请输入关键字，多关键字之间用空格或者英文隔开"
            />,
          )}
        </FormItem>
        <FormItem label="缩略图" >
          {getFieldDecorator('addInformations_thumbnail', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                if (value === undefined || value.fileList.length < 1) {
                  errors.push(
                  new Error('less or more'),
                  );
                  const somerule = rule;
                  somerule.message = '请上传缩略图';
                }
                callback(errors);
              } }],
          })(
            <PicturesWall
              id="youxiicon"
              setFieldsValue={setFieldsValue}
              getFieldValue={getFieldValue} limit={1}
            />,
          )}
        </FormItem>
        <FormItem label="发布时间" >
          {getFieldDecorator('information_emitTime', {
            rules: [{ required: true, message: '请选择发布时间' }],
          })(
            <DatePicker />,
          )}
        </FormItem>
        <FormItem label="游戏简介" >
          {getFieldDecorator('addInformations_intruduction', {
            rules: [{ required: true, message: '没有输入游戏简介,或者字段过长', whitespace: true, max: 200 }],
          })(
            <LzEditor
              cbReceiver={content =>
                setFieldsValue({ addInformations_intruduction: content })}
            />,
          )}
        </FormItem>
        <FormItem label="当前状态" >
          {getFieldDecorator('dangqianzhuangtai', {
            rules: [{ required: true, message: '请选择当前状态' }],
          })(
            <RadioGroup>
              <Radio value={1}>程序接入</Radio>
              <Radio value={2}>上线</Radio>
              <Radio value={3}>下线</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="提交" >
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
          <Button
            type="danger"
          >
              取消
            </Button>
        </FormItem>
      </Form>
    );
  }
}

Hello.propTypes = {
  form: PropTypes.shape({
    getFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    setFieldsValue: PropTypes.func,
    setFields: PropTypes.func,
    validateFields: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldValidating: PropTypes.func,
    isFieldTouched: PropTypes.func,
    isFieldsTouched: PropTypes.func,
    resetFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
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

const NewForm = Form.create()(Hello);

const GameInformationWithTabs = function GameInformationWithTabs(props) {
  const { history } = props;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="资讯列表" key="1">{<GameInformation />}</TabPane>
      <TabPane tab="添加资讯" key="2">{<NewForm history={history} />}</TabPane>
    </Tabs>

  );
};
GameInformationWithTabs.propTypes = {
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

export default GameInformationWithTabs;
