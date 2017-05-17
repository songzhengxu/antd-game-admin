import update from 'react-addons-update';

class ReducerMaker {
  constructor({ actionChecker, reducerName, data } = {}) {
    this.actionChecker = actionChecker;
    this.reducerName = reducerName;
    this.data = data;
    this.reducerFunction = this.reducerFunction.bind(this);
    this.makeReduer = this.makeReduer.bind(this);
  }
  reducerFunction() { // 真正处理state的方法
    const data = this.data;
    return (state = data, action) => {
      const { type } = action;
      // 利用actionChecker 来判断发生的是哪个动作
      return this.actionChecker[type] ? this.actionChecker[type](state, action) : state;
    };
  }
  makeReduer() {
    const reducerName = this.reducerName;
    return (state, action) => { // 产出的state 实际上这里的stae，所以这里产出的state是独立的，不同的 新的reduer
      const { name } = action;
      const isInitializetionCall = state === undefined;
      if (name !== reducerName && !isInitializetionCall) {
         // 名字不对 且 非初始状态 因为所有reducer都有接受到disptach方法发出来的action，所以一定要对便是进行判断是否需要更新state
        return state;
      }
      return this.reducerFunction()(state, action);
    };
  }
}

const MakeActionChecker = function MakeActionChecker(propName) {
  return {
    GET_DATA: (state, action) => {
      const newState = update(state,
        { [propName]:
        { status: { $set: action.type },
          data: { $set: action.data },
        },
        });
      console.log(newState);
      return newState;
    },
  };
};

export { ReducerMaker, MakeActionChecker };
