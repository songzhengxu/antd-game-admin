import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdvertisementMobile from '../Component/AdvertisementModule/AdvertisementMobile';


class ComponentTest extends Component {
  render() {
    return (
      <div className="comment">Nav1</div>
    );
  }
}

class SiderMenuRoutes extends Component {
  render() {
    return (
      <div className="contentInside">
        <Switch>
          <Route path="/advertisementMobile" component={AdvertisementMobile} />
        </Switch>
      </div>
    );
  }
}

export default SiderMenuRoutes;
