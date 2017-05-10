import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import { queryArray } from '../../utils';


const Bread = ({ menu }) => {
  // 匹配当前路由寻找出当前的菜单
  const pathArray = [];
  let current;
  for (const index in menu) {
    if (menu[index].router && pathToRegexp(menu[index].router).exec(location.pathname)) {
      current = menu[index];
      break;
    }
  }

  // 定义函数来
  const getPathArray = (item) => {
    pathArray.unshift(item);
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'));
    }
  };

  if (!current) {
    pathArray.push({
      id: 404,
      name: 'Not Found',
    });
  } else {
    getPathArray(current);
  }

  pathArray.unshift({
    id: 0,
    icon: 'appstore-o',
    name: '首页',
    router: '/',
  });
  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon
          ? <Icon type={item.icon} style={{ marginRight: 4 }} />
          : ''}{item.name}</span>
    );
    return (
      <Breadcrumb.Item key={key}>
        {(item.router)
          ? <Link to={item.router}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    );
  });
  return (
    <div className="bread">
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  );
};

export default Bread;
