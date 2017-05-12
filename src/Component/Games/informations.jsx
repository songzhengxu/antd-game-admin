import React from 'react';


/*
class Hello extends React.Component {
  componentDidMount() {
    console.log('first hello');
  }
  render() {
    return (
      <h1>hello</h1>
    );
  }
}
class AnotherHello extends React.Component {
  componentDidMount() {
    console.log('second hello');
  }
  render() {
    return (
      <h1>world</h1>
    );
  }
}
*/

/**
 * [WithDiscription HOC example]
 * @param {[String]} Wrapper   [变动的参数]
 * @param {[String]} whatToSay [变动的参数]
 */
function WithDiscription(Wrapper, whatToSay) {
  return class extends React.Component {
    componentDidMount() {
      console.log(whatToSay);
    }
    render() {
      return (
        <h1>{Wrapper}</h1>
      );
    }
  };
}

const Hello = WithDiscription('hello', 'first');
const World = WithDiscription('world', 'second');

export const Display = function Display() {
  return (
    <div>
      <Hello />
      <World />
    </div>
  );
};


const Header = function Header(props) {
  return (
    <h1 onClick={props.onClick} >{props.children}</h1>
  );
};

function HeaderMaker(Wrapper, content, handler) {
  return class extends React.Component {
    // 构造时触发
    constructor(props) {
      super(props);
      this.handler = handler.bind(this);
    }
    render() {
      return (
        <Wrapper onClick={this.handler} >{content}</Wrapper>
      );
    }
  };
}

// 生成构造器
const FirstHeader = HeaderMaker(Header, 'hello', function Handler() {
  console.log(this);
});
// 生成构造器
const SecondMaker = HeaderMaker(Header, 'world', () => {
  console.log(this);
});

const SecondDisplay = function SecondDisplay() {
  return (
    // 真正构造组件, 所以this 只想SecondDisplay
    <div>
      <FirstHeader />
      <SecondMaker />
    </div>
  );
};

export default SecondDisplay;
