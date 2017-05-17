import React from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;


class Tab {
  constructor(title, component) {
    this.title = title;
    this.component = component;
    this.children = [];
    for (const value of title) {
      for (const componentValue of title) {
        this.children.push(<TabPane tab={value}>{componentValue}</TabPane>);
      }
    }
  }
  render() {
    return (
      <Tabs type="card">
        {this.children}
      </Tabs>
    );
  }
}

// class Website extends Component {
//   render() {
//     return (
//       <Tabs type="card">
//         <TabPane tab="网站信息" key="1">222</TabPane>
//         <TabPane tab="SEO设置" key="2" >333</TabPane>
//       </Tabs>
//     );
//   }
// }

export default Tab;
