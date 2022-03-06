import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from '../serviceWorker'

import App from './index'

const testData = [
  {"item": {"id":"f_15878717"}, "filters":{"monthId": 2022*100+1} },
  {"item": {"id":"f_15878717"}, "filters":{"monthId": 2022*100+2} }
];

interface IProps {
}

interface IState {
  index?: number;
}

class Runner extends React.Component<IProps, IState>{
  constructor(props){
    super(props);
    this.toggleIndex = this.toggleIndex.bind(this);
    this.state={
      index: 0
    };
  }

  toggleIndex(){
    this.setState({index: (this.state.index+1)%testData.length});
  }

  render(){

    console.log("Render: "+this.state.index);
    console.log(testData[this.state.index]);

    const params = new URL(location.href).searchParams;
    const server = params.get('server'); //"ws://localhost:10101";
    const route = params.get('route'); //"product_dev";
    const producer = params.get('producer') || "dashboard";

    return (
      <>
      <div onClick={this.toggleIndex} style={{position:"absolute", zIndex:10}}>CHANGE</div>
      <div>
        <App
          server={server}
          route={route}
          producer={producer}
          data={testData[this.state.index]}
        />
      </div>
      </>
    );
  }
}

ReactDOM.render(
    <Runner/>,
    document.getElementById('root')
  )

serviceWorker.unregister()
