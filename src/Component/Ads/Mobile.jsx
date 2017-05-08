import React, { Component } from 'react';
import { Button } from 'antd';
import Table from './Tabel';

class Mobile extends Component {
  render() {
    return (<div>
      <Button className="editable-add-btn">Create</Button>
      <Table />
    </div>);
  }
}

export default Mobile;
