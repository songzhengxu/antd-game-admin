// import update from 'react-addons-update';


const SiderReducer = (state = { light: false }, action) => {
  switch (action.type) {
    case 'changeLight': // 修改
      return { light: !state.light };
    default:
      return state;
  }
};


// const data = {};
// data.gameMenus = {};
// data.changeLight = {};
// // 状态要写在每一个独立的数据源里面。否则，一次更新，整个state更新。
// data.gameMenus.status = 'WAIT_FOR_FETCHING'; // REFRESH_DATA, GET_DATA
//
// const SiderReducer = function SiderReducer(state = data, action) {
//   switch (action.type) {
//     case 'GET_DATA':
//       {
//         const newState = update(state,
//           { gameMenus:
//           { status: { $set: action.type },
//             data: { $set: action.data },
//           },
//           });
//         return newState;
//       }
//     case 'REFRESH_DATA':
//       {
//         const newState = Object.assign({}, state);
//         newState.gameMenus.status = 'REFRESH_DATA';
//         return newState;
//       }
//     default:
//       return state;
//   }
// };

export default SiderReducer;
