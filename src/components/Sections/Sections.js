import "./Sections.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import EditIcon from "@material-ui/icons/Edit";
import _ from "lodash";
import React from "react";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";

class Sections extends Component {
   constructor(props) {
      super(props);
      this.state = { budgets: props.budgets, isEditMode: false };
   }

   // componentWillReceiveProps(newProps) {
   //    console.log('hi from receive props')
   //    if (this.state.budgets !== newProps.budgets) {
   //       this.setState({ budgets: newProps.budgets });
   //    }
   // }

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

   deleteItem = (item, group_id) => {
      let budgets = [...this.state.budgets];
      let items = budgets.find((x) => x.group_id === group_id).items;
      _.remove(items, { item_id: item.item_id });
      this.setState({ budgets: budgets });
   };

   deleteGroup = (group_id) => {
      let budgets = [...this.state.budgets];
      _.remove(budgets, { group_id: group_id });
      this.setState({ budgets: budgets });
   };

   onGroupRename = (index, budget) => {
      console.log(this);
      console.log(budget.group_name);
   };

   switchToEditMode = () => {
      this.setState({ isEditMode: true });
   };

   save = () => {
      this.setState({ isEditMode: false });
   };

   renderEditButton() {
      if (this.state.isEditMode) {
         return (
            <Button variant="primary" size="sm" onClick={this.save}>
               Save
            </Button>
         );
      }
      return (
         <EditIcon
            className="edit-icon-button"
            color="primary"
            onClick={this.switchToEditMode}
         />
      );
   }

   render() {
      const listBudgetGroups = this.state.budgets.map((budget, index) => (
         <Container className="budget-group" fluid key={budget.group_id}>
            <Row className="budget-group-header" key={`header_${budget.group_id}`}>
               <Col xs={5}>
                  <InputGroup className="budget-item-input-group">
                     <FormControl
                        disabled={!this.state.isEditMode}
                        className={
                           this.state.isEditMode
                              ? "budget-item-form-control-enabled"
                              : "budget-item-form-control-disabled"
                        }
                        placeholder="Group Name"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        defaultValue={budget.group_name}
                     />
                  </InputGroup>
               </Col>
               <Col className="budget-group-header-column">Budgeted</Col>
               <Col className="budget-group-header-column has-delete">
                  <div className="spent-header">Spent</div>
                  {this.state.isEditMode && (
                     <Link
                     
                        onClick={this.deleteGroup.bind(this, budget.group_id)}
                     >
                        delete group
                     </Link>
                  )}
               </Col>
            </Row>
            <ListItem
               items={budget.items}
               group_id={budget.group_id}
               isEditMode={this.state.isEditMode}
               deleteItem={this.deleteItem}
            ></ListItem>
            <Row key={`bottom_${budget.group_id}`}>
               {this.state.isEditMode && (
                  <div className="bottom-row">
                     <Button
                        onClick={this.addItem.bind(this, index, budget.items)}
                        variant="link"
                     >
                        Add Item
                     </Button>
                  </div>
               )}
               {!this.state.isEditMode && (
                  <div className="bottom-row">
                     <Button variant="link">
                        <br />
                     </Button>
                  </div>
               )}
            </Row>
         </Container>
      ));
      return (
         <div>
            <div className="edit-buttons-container">
               {this.renderEditButton()}
            </div>
            <div>{listBudgetGroups}</div>
         </div>
      );
   }
}

function ListItem(props) {
   const items = props.items;
   const group_id = props.group_id;
   let isEditMode = props.isEditMode;
   const listBudgetItems = items.map((item) => (
      <Row className="budget-item-row" key={item.item_id}>
         <Col xs={5}>
            <InputGroup
               size="sm"
               className="budget-group-header-name budget-item-input-group"
            >
               <FormControl
                  disabled={!isEditMode}
                  className={
                     isEditMode
                        ? "budget-item-form-control-enabled"
                        : "budget-item-form-control-disabled"
                  }
                  placeholder="Item Name"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={item.item_name}
               />
            </InputGroup>
         </Col>
         <Col>
            <InputGroup
               size="sm"
               className="budget-item-header-column budget-item-input-group"
            >
               <FormControl
                  disabled={!isEditMode}
                  className={
                     isEditMode
                        ? "budget-item-form-control-enabled"
                        : "budget-item-form-control-disabled"
                  }
                  placeholder="Hours Budgeted"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={item.time_budgeted}
               />
            </InputGroup>
         </Col>
         <Col className="has-delete">
            <InputGroup
               size="sm"
               className="budget-item-header-column budget-item-input-group"
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
            {isEditMode && (
               <DeleteOutlineIcon
                  className="delete-button-row"
                  color="primary"
                  onClick={() => props.deleteItem(item, group_id)}
               ></DeleteOutlineIcon>
            )}
         </Col>
         <ProgressBar
            className="budget-item-progress"
            now={calculatePercentDiff(item.time_budgeted, item.time_spent)}
         />
      </Row>
   ));
   return <div>{listBudgetItems}</div>;
}

function calculatePercentDiff(max, current) {
   const value = Math.abs(((max - current) / max) * 100 - 100);
   return value;
}

export default Sections;
