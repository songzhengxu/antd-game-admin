import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/**
 * 模块入口方法
 *
 * @param {Object} mySeting
 * @returns
 */
const Main = (mySeting) => {
  const seting = {
    id: '', // 应用唯一id表示
    action: '', // action
    type: 'GET', // 请求类型
    url: '', // 请求地址
    stop: false, // true 拦截请求，false不拦截请求
    data: null, // 发送给服务器的数据
    component: <div />, // 数据回调给的组件
    success: state => state, // 请求成功后执行的方法
    error: state => state, // 请求失败后执行的方法
  };

  /**
   * 覆盖默认设置
   */
  Object.assign(seting, mySeting);

    /**
     * 组件入口
     *
     * @class Index
     * @extends {Component}
     */
  class Index extends Component {
    constructor(props) {
      super(props);

      /**
       * 初始化状态
       *
       * @param {Object} props
       */
      this.initState = () => {

      };

      /**
       * DOM初始化完成后执行回调
       */
      this.redayDOM = () => {
        axios.get(this.getUrl())
        .then((response) => {
          this.setState({
            loading: false,
            data: response,
          });
        });
      };

      /**
       * 获取ajax 请求url
       *
       * @returns Object
       */
      this.getUrl = () => {
        const { url } = this.props.seting;
        if (typeof url === 'function') {
          return url(this.props, this.state);
        } else if (url && typeof url === 'string') {
          return url;
        }
        return url;
      };

      /**
       * 获取要发送的数据
       *
       * @returns
       */
      this.getData = () => {

      };

      // 调用初始化
      this.initState(this.props);
    }

    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() {
      this.redayDOM();
    }

    render() {
      return <this.props.seting.component {...this.props} state={this.state} />;
    }
  }

  Index.propTypes = {
    seting: React.PropTypes.object.isRequired,
  };

  Index.defaultProps = { seting };

  return connect(state => ({ state: state[seting.id] }), seting.action)(Index); // 连接redux
};


export default Main;
