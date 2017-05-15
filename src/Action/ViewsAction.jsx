/*
    基础的Action 这种写法可以用于，其它人使用时可extends去直接拓展
    下面方法为 views 的方法的改写 可以做到拓展功能
 */


/**
 * [obj 基础 Acton类]
 * @type {Object}
 */
class ViewsAction {
  constructor() {
    this.obj = { };
  }

  getObject() {
    return this.obj;
  }
  getAction(dispatch) {
    const actionObject = {};
    for (const [key, value] of Object.entries(this.obj)) {
      const newValue = Object.assign({}, value);
      actionObject[key] = () => dispatch(newValue);
    }
    return actionObject;
  }
}

class ViewsActionExtend extends ViewsAction {
  constructor() {
    super();
    const newObj = super.getObject();
    this.obj = Object.assign({}, newObj, { changeLight: { type: 'changeLight' }, changeCollapsed: { type: 'changeCollapsed' } });
  }
}

export default ViewsActionExtend;
