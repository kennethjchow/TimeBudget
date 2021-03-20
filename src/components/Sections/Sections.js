import "./Sections.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import { Component } from "react";

class Sections extends Component {
   constructor(props) {
      super(props);
      console.log("hi");
   }

   state = { budgets: this.props.budgets, isEditMode: false };

   addItem = (index, budgetItems) => {
      budgetItems.push({
         item_name: "TESTING",
         time_budgeted: 56,
         time_spent: 3,
      });
      const budgets = this.state.budgets;
      budgets[index]["items"] = budgetItems;
      this.setState({ budgets: budgets });
   };

   onGroupRename = (index, budget) => {
      console.log(this);
      console.log(budget.group_name);
   };

   switchToEditMode = () => {
      this.setState({isEditMode: true})
   }

   save = () => {
      this.setState({isEditMode: false})
   }

   render() {
      const listBudgetGroups = this.state.budgets.map((budget, index) => (
         <div className="budget-group">
            <div className="budget-group-header">
               <InputGroup className="budget-group-header-name budget-item-input-group" >
                  <FormControl
                     disabled={!this.state.isEditMode}
                     className={this.state.isEditMode ? 'budget-item-form-control-enabled':'budget-item-form-control-disabled'}
                     placeholder="Group Name"
                     aria-label="Small"
                     aria-describedby="inputGroup-sizing-sm"
                     defaultValue={budget.group_name}
                  />
               </InputGroup>

               <span className="budget-group-header-column">Budgeted</span>
               <span className="budget-group-header-column">Spent</span>
            </div>
            <ListItem items={budget.items} isEditMode={this.state.isEditMode}></ListItem>
            {this.state.isEditMode && (
               <div onClick={this.addItem.bind(this, index, budget.items)}>
                  Add item
               </div>
            )}
         </div>
      ));
      return (
         <div>
            <Button variant="primary" onClick={this.switchToEditMode}>Edit</Button>
            <Button variant="primary" onClick={this.save}>Save</Button>
            <div>{listBudgetGroups}</div>
         </div>
      );
   }
}

function ListItem(props) {
   const items = props.items;
   let isEditMode = props.isEditMode
   const listBudgetItems = items.map((item) => (
      <div className="budget-item-row">
         <div className="budget-item-row-content">
            <InputGroup
               size="sm"
               className="mb-3 budget-group-header-name budget-item-input-group"
            >
               <FormControl
                  disabled={!isEditMode}
                  className={isEditMode ? 'budget-item-form-control-enabled':'budget-item-form-control-disabled'}
                  placeholder="Item Name"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={item.item_name}
               />
            </InputGroup>
            <InputGroup
               size="sm"
               className="mb-3 budget-item-header-column budget-item-input-group"
            >
               <FormControl
                  disabled={!isEditMode}
                  className={isEditMode ? 'budget-item-form-control-enabled':'budget-item-form-control-disabled'}
                  placeholder="Hours Budgeted"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={item.time_budgeted}
               />
            </InputGroup>
            <InputGroup
               size="sm"
               className="mb-3 budget-item-header-column budget-item-input-group"
            >
               <FormControl
                  disabled
                  className="budget-item-form-control-disabled"
                  placeholder="Hours Spent"
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

export default Sections;
