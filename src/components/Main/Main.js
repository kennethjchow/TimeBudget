import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BudgetPage from "../BudgetPage/BudgetPage";
import CalendarPage from "../CalendarPage/CalendarPage";
import SideNavbar from "../SideNavbar/SideNavbar";

function Main() {
   return (
      <Router>
         <div className="Main">
            <SideNavbar></SideNavbar>

            <Route path="/" exact component={BudgetPage} />
            <Route path="/budget" component={BudgetPage} />
            <Route path="/calendar" component={CalendarPage} />
         </div>
      </Router>
   );
}

export default Main;
