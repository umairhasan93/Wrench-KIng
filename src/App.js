import authAdmin from "./Screens/Auth/Admin";
import Home from "./Screens/Home/index";
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles.css'
import SecureRoute from "./components/secureRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const isAuthenticated = localStorage.getItem('@admin')
  return (
    <Switch>
      <SecureRoute path='/home' component={Home}></SecureRoute>
      <Route exact path='/admin-login' component={authAdmin}></Route>
      {isAuthenticated !== null ? (
        <Redirect to='/home' />
      ) : (
        <Redirect to='/admin-login' />
      )}
    </Switch>
  )
}

const App = () => {
  return (
    <div className="App">
      <Router >
        <Switch>
          <Admin />
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
