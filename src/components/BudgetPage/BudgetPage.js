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

   addTimeHandler() {
      let budgetCategoriesCopy = [...this.state.budgetCategories];
      budgetCategoriesCopy[0].time_spent += 1;
      this.setState({ budgetCategories: budgetCategoriesCopy });
   }
   render() {
      const startOfWeek = moment().startOf('isoweek').format('MMMM Do')
      const endOfWeek = moment().endOf("isoweek").format("MMMM Do")
      const year = moment().startOf('isoweek').format('YYYY')
      return (
         <div className="budgetPage">
            <div className="header">
               <h5 className="headerYear">
                  {year}
               </h5>
               <h1 className="headerDate">
                  {startOfWeek} - {endOfWeek}
               </h1>
               <div>{this.state.hoursLeft} hours left to plan</div>
            </div>
            <Sections budgets={this.state.budgetCategories}></Sections>
            <AddTimeButton addTimeHandler={this.addTimeHandler}></AddTimeButton>
         </div>
      );
   }
}

export default BudgetPage;
