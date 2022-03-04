import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from '../serviceWorker'

import App from './index'


const params = new URL(location.href).searchParams;

const server = params.get('server'); //"ws://localhost:10101";
const route = params.get('route'); //"product_dev";
const producer = params.get('producer') || "dashboard";

ReactDOM.render(
    <App
      server={server}
      route={route}
      producer={producer}
      data={ {"item": {"id":"f_15878717"}, "filters":{"monthId": 2022*100+1} } }
    />,
    document.getElementById('root')
  )

serviceWorker.unregister()
