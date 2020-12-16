import { Component } from "react";
import BudgetCategories from "../../data/data";
import Section from "../Section/Section";
import axios from "axios";
import "./BudgetPage.css";

class BudgetPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    budgetCategories: [],
    loaded: false,
  };

  componentDidMount() {
    if (!this.state.loaded && this.state.budgetCategories.length===0) {
      axios.get(`http://localhost:8081/listBudgetData`).then((res) => {
        console.log(res.data)
        console.log('data is here')
        this.setState({ budgetCategories: res.data, loaded: true });
      });
    }
  }

  render() {
    return (
      <div className="budgetPage">
        <Section budgets={this.state.budgetCategories}></Section>
      </div>
    );
  }
}

export default BudgetPage;
