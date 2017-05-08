import React, { Component } from 'react';
import { Table, Input, Radio, Form, Upload, Icon, Button } from 'antd';
import LzEditor from 'react-lz-editor';
import data from '../ContentManagementModule/tableData';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
  render: () => (
    <span>
      <a href={undefined}>编辑专题</a>
      <span className="ant-divider" />
      <a href={undefined}>编辑游戏列表</a>
      <span className="ant-divider" />
      <a href={undefined} className="ant-dropdown-link">
      删除
      </a>
    </span>
  ) },
];

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.fetch(data);
  }
  fetch(tableData) {
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    pagination.total = tableData.totalCount;
    this.setState({
      loading: false,
      data: data.results,
      pagination,
    });
  }

  handleTableChange(pagination, filters, sorter) {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.registered}
        dataSource={data}
        pagination={{ defaultPageSize: 2 }}
        // loading={this.state.loading}
        // onChange={this.handleTableChange}
      />
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
        {/*
        <FormItem
          {...formItemLayout}
          label="Dragger"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.
                  Strictly prohibit from uploading company data or other band files</p>
              </Upload.Dragger>,
            )}
          </div>
        </FormItem> */}
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
          <a href={undefined} className="backtrack">返回</a>
        </FormItem>
      </Form>
    );
  }
}
const WrappedDemo = Form.create()(Addsubject);
export { DataTable, WrappedDemo };
