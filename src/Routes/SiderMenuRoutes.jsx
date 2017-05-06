import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdvertisementMobile from '../Component/AdvertisementModule/AdvertisementMobile';
import GameList from '../Component/Gamemanagement/GameList';


class SiderMenuRoutes extends Component {
  render() {
    return (
      <div className="contentInside">
        <Switch>
          <Route path="/advertisementMobile" component={AdvertisementMobile} />
          <Route path="/gameList" component={GameList} />
          <Route path="/addGame" component={AdvertisementMobile} />
          <Route path="/gameType" component={AdvertisementMobile} />
          <Route path="/gameNews" component={AdvertisementMobile} />
        </Switch>
      </div>
    );
  }
}

export default SiderMenuRoutes;
