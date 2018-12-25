import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import * as stores from './store'

import 'static/scss/app.scss'
import 'rodal/lib/rodal.css'
import './util/requestNextAnimationFrame'

import Routes from './routes'

render(
	<Provider {...stores}>
		<Routes />
	</Provider>,
	document.getElementById('root')
)
