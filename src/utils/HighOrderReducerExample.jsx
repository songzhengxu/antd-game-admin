import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { connect } from 'react-redux';

const informationsAction = function informationsAction(dispatch) {
  const addOne = { name: 'first', type: 'add_two' };
  const addTwo = { name: 'second', type: 'add_one' };
  return {
    addOneHandler: () => dispatch(addOne),
    addTwoHandler: () => dispatch(addTwo),
  };
};

// 更新checker 请在这里添加
/**
 * [actionTypeChecker 处理reducer逻辑的对象, 对switch流程进行优化]
 * @type {Object}
 */
const actionTypeChecker = {
  add_one: state => state + 1,
  add_two: state => state + 2,
};

/*
const informationsReducer = function informationsReducer(state = 0, action) {
  const { type } = action;
  return actionTypeChecker[type] ? actionTypeChecker[type](state) : state;
};
*/

// 用于创建不同的reducer
// @param
// actionChecker 用于 处理reducer的逻辑，替代原来的switch语句
// reducerName 用于标记不同的reducer, 时多reducerFunction的增强，从而产生不同的reducer （增强）
// reducerFunction 处理state的逻辑, 可以通过extends 改写处理state的逻辑 （复制）
// makeReduer 产出 可绑定到store的reducer
class ReducerMaker {
  constructor({ actionChecker = actionTypeChecker, reducerName } = {}) {
    this.actionChecker = actionChecker;
    this.reducerName = reducerName;
  }
  reducerFunction() { // 真正处理state的方法
    return (state = 0, action) => {
      const { type } = action;
      // 利用actionChecker 来判断发生的是哪个动作
      return this.actionChecker[type] ? this.actionChecker[type](state) : state;
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

// 通过 extedns 复制一份
class AnotherReducerMaker extends ReducerMaker {
  constructor({ actionChecker, reducerName } = {}) {
    super({ actionChecker, reducerName });
    delete this.actionChecker.add_two;
  }
}

// 再复制一份
class ThirdReducerMaker extends AnotherReducerMaker {
  constructor({ actionChecker, reducerName } = {}) {
    super({ actionChecker, reducerName });
    this.actionChecker.add_two = state => state + 2;
  }
}

// firstMaker 正常工作，虽然再AnotherReducerMaker里面将add_two删除了，但是再ThirdReducerMaker又增加了
const firstMaker = new ThirdReducerMaker({ reducerName: 'first' });

// 通过reducerName标识符对reduce进行标识，产出新的reducer
const secondMaker = new ReducerMaker({ reducerName: 'second' });

const firstInformationReducer = firstMaker.makeReduer();
const secondInformationReducer = secondMaker.makeReduer();
/*
function CreateReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { name } = action;
    const isInitializetionCall = state === undefined;
    if (name !== reducerName && !isInitializetionCall) return state;
    return reducerFunction(state, action);
  };
}

const firstInformationReducer = CreateReducer(informationsReducer, 'first');
const secondInformationReducer = CreateReducer(informationsReducer, 'second');
*/

export { firstInformationReducer, secondInformationReducer };

const TestComponent = function TestComponent(props) {
  return (
    <div>
      <div>
        <span><Button onClick={props.addOneHandler} >+1秒</Button></span>
        <span>{props.firstNumber}</span>
      </div>
      <div>
        <span><Button onClick={props.addTwoHandler}>+2秒</Button></span>
        <span>{props.secondNumber}</span>
      </div>
    </div>
  );
};

TestComponent.propTypes = {
  firstNumber: PropTypes.number.isRequired,
  secondNumber: PropTypes.number.isRequired,
  addTwoHandler: PropTypes.func.isRequired,
  addOneHandler: PropTypes.func.isRequired,
};

export default connect(state =>
  ({ firstNumber: state.firstInformationReducer,
    secondNumber: state.secondInformationReducer }),
  informationsAction)(TestComponent);
