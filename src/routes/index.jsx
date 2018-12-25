import React from 'react'
import { Route, Redirect, Switch, HashRouter as Router } from 'react-router-dom'
import Login from 'containers/Login'
import List from 'containers/MenuList'

const { RouterHandler } = Router

const routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" render={() => (
				<Redirect to="/login"/>
			)}/>
      <Route path='/login' component={Login}/>
      <Route path='/list' component={List}/>
		</Switch>
	</Router>
)

export default routes
