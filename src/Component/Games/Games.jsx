import React from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import fetchDataIfNeed from '../../Action/GameListAction';

class GameList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeed('https://cnodejs.org/api/v1/topics'));
  }
  render() {
    const { data } = this.props.gameList;
    if (data) {
      return (
        <div className="gameListTable">
          <Table
            bordered
          />
          {data.success.toString()}
        </div>
      );
    }
    return (
      <div className="gameListLoading">
        <Spin />
      </div>
    );
  }

}

// container
export default connect(state => ({ gameList: state.GameManagement.gameList }))(GameList);
