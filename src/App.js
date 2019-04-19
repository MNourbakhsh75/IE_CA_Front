import React from 'react';
import {BrowserRouter as Router,Route,} from 'react-router-dom'
import project from './project/project';
import home from './home/home.js'
import user from './user/user'
import register from './register/register'
import login from './login/login';
const App = () => 
  <Router>
      <Route exact path='/project' component={project}/>
      <Route exact path='/home' component={home}/>
      <Route exact path='/user' component={user}/>
      <Route exact path='/register' component={register}/>
      <Route exact path='/login' component={login}/>
  </Router>



// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             <project/>
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React!
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
