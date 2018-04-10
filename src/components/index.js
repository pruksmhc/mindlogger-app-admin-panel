import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import Images from './protected/Images'
import Users from './protected/Users'
import Answers from './protected/Answers'
import { logout } from '../helpers/auth'
import AuthRoute from './authRoute'
import Header from './Header'
import SetupActs from './protected/SetupActs';
import Acts from './protected/Acts';
import EditSurvey from './modules/survey/EditSurvey';
import Profile from './protected/Profile';

export default class App extends Component {
  componentDidMount () {
  }
  componentWillUnmount () {
    
  }
  render() {
    return (
      <Provider store={this.props.store} >
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <AuthRoute path='/dashboard' component={Dashboard} />
                <AuthRoute path='/images' component={Images} />
                <AuthRoute path='/users/:id/answers' component={Answers} />
                <AuthRoute path='/users/:id/setup' component={SetupActs} />
                <AuthRoute path='/users' component={Users} />
                <AuthRoute path='/profile' component={Profile} />
                <AuthRoute path='/acts' component={Acts} />
                <AuthRoute path='/surveys/:id' component={EditSurvey} />
                
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}