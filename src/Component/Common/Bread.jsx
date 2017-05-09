import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

class Mian extends Component {
  render() {
    return (
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>An2</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}
export default Mian;
