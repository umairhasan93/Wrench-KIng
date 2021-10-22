import Admin from "./Screens/Auth/Admin";
import Home from "./Screens/Home/index";
import Registeration from "./Screens/Registeration";
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles.css'

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>

          <Route exact path="/" component={Admin} />
          <Route path="/home" component={Home} />
          {/* {user.email !== "" && <Redirect to={'/home'} />} */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
