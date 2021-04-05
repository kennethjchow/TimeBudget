import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Main from "./components/Main/Main";
import SignupPage from "./components/SignupPage/SignupPage";

function App() {
   return (
      <Router>
         <div className="App">
            <Switch>
               <Route path="/login" component={LoginPage} />
               <Route path="/signup" component={SignupPage} />
               <Route component={Main} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
