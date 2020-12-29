import { Component } from "react";
import Sections from "../Sections/Sections";
import axios from "axios";
import "./BudgetPage.css";
import AddTimeButton from "../AddTimeButton/AddTimeButton";

class BudgetPage extends Component {
   constructor(props) {
      super(props)
  
      this.addTimeHandler = this.addTimeHandler.bind(this)
    }
   
   state = {
      budgetCategories: [],
      loaded: false,
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
      let budgetCategoriesCopy = [...this.state.budgetCategories]
      budgetCategoriesCopy[0].time_spent+=1
      this.setState({budgetCategories: budgetCategoriesCopy});
   }

   render() {
      return (
         <div className="budgetPage">
            <Sections budgets={this.state.budgetCategories}></Sections>
				<AddTimeButton addTimeHandler={this.addTimeHandler}></AddTimeButton>
         </div>
      );
   }
}

export default BudgetPage;
