import { ReducerMaker, MakeActionChecker } from '../../utils/HOR';

const data = {
  messageList: {
    status: 'WAIT_FOR_FETCHING',
  },
};

const actionChecker = MakeActionChecker('messageList');
const messageListReducerMaker = new ReducerMaker({ actionChecker, reducerName: 'messageList', data });
const MessageListReducer = messageListReducerMaker.makeReduer();
export default MessageListReducer;
