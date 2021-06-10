import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BudgetPage from "../BudgetPage/BudgetPage";
import CalendarPage from "../CalendarPage/CalendarPage";
import SideNavbar from "../SideNavbar/SideNavbar";
import AuthenticatedRoute from "../AuthenticatedRoute";


function Main() {
   return (
      <Router>
         <div className="Main">
            <SideNavbar></SideNavbar>

            <AuthenticatedRoute path="/" exact component={BudgetPage} />
            <AuthenticatedRoute path="/budget" component={BudgetPage} />
            <AuthenticatedRoute path="/calendar" component={CalendarPage} />
         </div>

      </Router>
   );
}

export default Main;
