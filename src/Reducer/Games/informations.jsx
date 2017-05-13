const informationsReducer = function informationsReducer(state = 0, action) {
  const { type } = action;
  switch (type) {
    case 'add_one':
      {
        return state + 1;
      }
    case 'add_two':
      {
        return state + 2;
      }
    default:
      return state;
  }
};

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

export { firstInformationReducer, secondInformationReducer };
