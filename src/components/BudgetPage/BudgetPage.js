import { Component } from "react";
import Sections from "../Sections/Sections";
import axios from "axios";
import moment from "moment";
import "./BudgetPage.css";
import AddTimeButton from "../AddTimeButton/AddTimeButton";

class BudgetPage extends Component {
   constructor(props) {
      super(props);

      this.addTimeHandler = this.addTimeHandler.bind(this);
   }

   state = {
      budgetCategories: [],
      loaded: false,
      hoursLeft: 172,
   };

   componentDidMount() {
      if (!this.state.loaded && this.state.budgetCategories.length === 0) {
         axios.get(`http://localhost:8081/listBudgetData`).then((res) => {
            console.log(res.data);
            console.log("data is here");
            this.setState({ budgetCategories: res.data, loaded: true });
         });
      }
   }

   calcTimeRemaining() {
      console.log('I am here')
      const budgets = this.state.budgetCategories;
      let sum = 0;
      budgets.forEach(function (budget, index) {
         budget.items.forEach(function (item, index) {
            sum += item.time_budgeted;
         });
      });
      return 172 - sum;
   }

   addTimeHandler() {
      let budgetCategoriesCopy = [...this.state.budgetCategories];
      budgetCategoriesCopy[0].time_spent += 1;
      this.setState({ budgetCategories: budgetCategoriesCopy });
   }
   render() {
      const timeLeft = this.calcTimeRemaining(); // TODO: Fix this so that it's bound to div
      const startOfWeek = moment().startOf("isoweek").format("MMMM Do");
      const endOfWeek = moment().endOf("isoweek").format("MMMM Do");
      const year = moment().startOf("isoweek").format("YYYY");
      return (
         <div className="budget-page">
            <div className="header">
               <h5 className="headerYear">{year}</h5>
               <h1 className="headerDate">
                  {startOfWeek} - {endOfWeek}
               </h1>
               <div>{timeLeft} hours left to plan</div>
            </div>
            <div className="budgets">
               <Sections budgets={this.state.budgetCategories}></Sections>
            </div>
         </div>
      );
   }
}

export default BudgetPage;
