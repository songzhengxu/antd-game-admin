const informationsAction = function informationsAction(dispatch) {
  const addOne = { name: 'first', type: 'add_one' };
  const addTwo = { name: 'second', type: 'add_two' };
  return {
    addOneHandler: () => dispatch(addOne),
    addTwoHandler: () => dispatch(addTwo),
  };
};

export default informationsAction;
