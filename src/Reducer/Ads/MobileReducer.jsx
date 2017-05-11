import update from 'react-addons-update';

const data = {};
data.Mobile = {};


const AdsReducer = function Ads(state = data, action) {
  switch (action.type) {
    case 'GET_DATA':
      {
        const newState = update(state,
          { Mobile:
          {
            component: { $set: action.data },
          },
          });
        return newState;
      }
    default:
      return state;
  }
};

export default AdsReducer;
