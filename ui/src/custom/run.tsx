import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from '../serviceWorker'

import App from './index'


const params = new URL(location.href).searchParams;

const server = params.get('server'); //"ws://10.182.0.15:10101";
const route = params.get('route'); //"product_dashboard";

ReactDOM.render(<App server={server} route={route} />, document.getElementById('root'))

serviceWorker.unregister()
