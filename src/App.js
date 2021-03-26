import "./App.css";
import BudgetPage from "./components/BudgetPage/BudgetPage";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import CalendarPage from "./components/CalendarPage/CalendarPage"

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
   return (
      <Router>
         <div className="App">
            <SideNavbar></SideNavbar>
            <Switch>
               <Route path="/" exact component={BudgetPage} />
               <Route path="/budget" component={BudgetPage} />
               <Route path="/calendar" component={CalendarPage} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
