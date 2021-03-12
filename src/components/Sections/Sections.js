import "./Sections.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React from "react";
import { Component } from "react";

class Section extends Component {
   constructor(props) {
      super(props);
      
      this.addItem = this.addItem.bind(this);
   }

   state = {budgets: this.props.budgets}
   

   addItem(index, budgetItems) {
      console.log(index)
      budgetItems.push({item_name: "TESTING", time_budgeted: 56, time_spent: 3})
      const budgets = this.state.budgets;
      budgets[index]['items'] = budgetItems
      this.setState({budgets: budgets})
   }

   render() {
      const listBudgetGroups = this.state.budgets.map((budget, index) => (
         <div className="budget-group">
            <div className="budget-group-header budget-item-input-group">
               <InputGroup className="budget-group-header-name">
                  <FormControl
                     className="budget-item-form-control"
                     placeholder="Item Name"
                     aria-label="Small"
                     aria-describedby="inputGroup-sizing-sm"
                     defaultValue={budget.group_name}
                  />
               </InputGroup>

               <span className="budget-group-header-column">Budgeted</span>
               <span className="budget-group-header-column">Spent</span>
            </div>
            <ListItem items={budget.items}></ListItem>
            <div onClick={this.addItem.bind(this, index, budget.items)}>
               Add item
            </div>
         </div>
      ));
      return <div>{listBudgetGroups}</div>;
   }
}

function ListItem(props) {
   const items = props.items;
   const listBudgetItems = items.map((item) => (
      <div className="budget-item-row">
         <div className="budget-group-row-content">
            <InputGroup
               size="sm"
               className="mb-3 budget-group-header-name budget-item-input-group"
            >
               <FormControl
                  className="budget-item-form-control"
                  placeholder="Item Name"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={item.item_name}
               />
            </InputGroup>
            <InputGroup
               size="sm"
               className="mb-3 budget-group-header-column budget-item-input-group"
            >
               <FormControl
                  className="budget-item-form-control"
                  placeholder="Item Name"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={item.time_budgeted}
               />
            </InputGroup>
            <InputGroup
               size="sm"
               className="mb-3 budget-group-header-column budget-item-input-group"
            >
               <FormControl
                  className="budget-item-form-control"
                  placeholder="Item Name"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={item.time_spent}
               />
            </InputGroup>
         </div>
         <ProgressBar
            className="budget-item-progress"
            now={calculatePercentDiff(item.time_budgeted, item.time_spent)}
         />
      </div>
   ));
   return <div>{listBudgetItems}</div>;
}

function calculatePercentDiff(max, current) {
   const value = Math.abs(((max - current) / max) * 100 - 100);
   return value;
}

export default Section;
