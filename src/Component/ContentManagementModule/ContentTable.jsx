import React, { Component } from 'react';
import { Table, Input, Radio, Form, Upload, Icon, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LzEditor from 'react-lz-editor';
import DropOption from '../Common/DropOption';
// import data from '../ContentManagementModule/tableData';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;


class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
    this.fetch = this.fetch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  handleMenu(record, event) {
    if (event.key === '1') {
      console.log('编辑专题$({record.key})');
    } else if (event.key === '2') {
      console.log('编辑游戏列表$({record.key})');
    } else if (event.key === '3') {
      confirm({
        title: 'Are you delect this record?',
        onOk() {
          console.log('删除$({record.key})');
        },
      });
    }
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/content/subject')
    .then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: response.data.datas,
        pagination,
      });
    });
  }

  handleTableChange(pagination) {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  }
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
        <Link to="/addContent">
          <button className="add-subject">添加专题</button>
        </Link>
        <Table
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={{ defaultPageSize: 2 }}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }

}


// class Addsubject extends Component {
//   constructor() {
//     super();
//     this.state = {
//       value: 1,
//     };
//   }
//   render() {
//     return (
//       <Form>
//         <FormItem
//           label="专题名称"
//         >
//           <Input />
//         </FormItem>
//         <FormItem
//           label="Dragger"
//         >
//           <div className="dropbox">
//             <Upload.Dragger name="files" action="/upload.do">
//               <p className="ant-upload-drag-icon">
//                 <Icon type="inbox" />
//               </p>
//               <p className="ant-upload-text">Click or drag file to this area to upload</p>
//               <p
//                 className="ant-upload-hint"
//               >Support for a single or bulk upload.
//               Strictly prohibit from uploading company data or other band files
//             </p>
//             </Upload.Dragger>
//           </div>
//         </FormItem>
//         <div>专题内容:</div>
//         <LzEditor
//           active="true"
//         />
//         <div>热门:</div>
//         <RadioGroup className="radioStyle">
//           <Radio value={1}>是</Radio>
//           <Radio value={2}>否</Radio>
//         </RadioGroup>
//         <div className="submit">
//           <FormItem>
//             <Button type="Submit" size="large">添加</Button>
//             <a href={undefined}>返回</a>
//           </FormItem>
//         </div>
//       </Form>
//     );
//   }
// }
//
//
class Addsubject extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="专题题目"
          hasFeedback
        >
          <Input type="text" />,
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片【建议尺寸：640*280】"
          extra="显示图片"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </FormItem>
        <FormItem>
          <LzEditor
            active="true"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="热门"
        >
          {getFieldDecorator('radio-group')(
            <RadioGroup>
              <Radio value="a">是</Radio>
              <Radio value="b">否</Radio>
            </RadioGroup>,
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">添加</Button>
          <Link to="/content/subjects">
            <Button type="primary" htmlType="submit" size="large" className="backtrack">返回</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}
const AddContent = Form.create()(Addsubject);
export { DataTable, AddContent };
