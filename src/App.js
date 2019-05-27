import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'
import project from './project/project';
import home from './home/home.js'
import user from './user/user'
import register from './register/register'
import login from './login/login';
const App = () => 
  <Router>
    {/* <div> */}
      <Route exact path="/project" component={project}/>
      <Route exact path="/" component={home}/>
      <Route exact path="/user" component={user}/>
      <Route exact path="/register" component={register}/>
      <Route exact path="/login" component={login}/>
    {/* </div> */}
  </Router>

export default App;
