import React, { Component } from 'react';
import { Select } from 'antd';
/**
 * [Selector 生成下拉列表]
 * @param  {[array]} props [数据]
 * @type {class}
 */


class Selector {
  constructor(props, text) {
    this.props = props;
    this.text = text;
    this.children = [];
    const options = props.games;
    for (const value of options) {
      this.children.push(<Option key={value.title} value={value.title}>{ value.title }</Option>);
    }
  }
  render() {
    return (
      <span className="gameList_selector" >
        {this.text} :
      <span className="gameList_selector_unit">
        <Select
          showSearch="true"
          style={{ width: 200 }}
          placeholder=" 请选择 "
          // optionFilterProp="children"
          // filterOption={(input, option) =>
          //   option.props.value.indexOf(input) >= 0}
        >
          { this.children}
        </Select>
      </span>
      </span>
    );
  }
}

export default Selector;
