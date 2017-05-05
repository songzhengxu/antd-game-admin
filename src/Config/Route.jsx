import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// 导入各种组件
import Home from '../Component/App'; // 页面组件
import NotFoundPage from '../Component/NotFoundPage'; // NotFoundPage
import Login from '../Component/Login'; // Login


// 路由配置
const RouteConfig = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/404" component={NotFoundPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </Router>
);

// 导出
export default RouteConfig;
