import "./Sections.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import EditIcon from "@material-ui/icons/Edit";
import _ from "lodash";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";

function Sections(props) {
   const [isEditMode, setIsEditMode] = useState(false);

   const addItem = (index, budgetItems) => {
      props.onAddItem(index, budgetItems);
   };

   const deleteGroup = (index, budgetItems) => {
      props.onDeleteGroup(index, budgetItems);
   };

   const deleteItem = (index, budgetItems) => {
      props.onDeleteItem(index, budgetItems);
   };

   const switchToEditMode = () => {
      setIsEditMode(true);
   };

   const save = () => {
      setIsEditMode(false);
   };

   const renderEditButton = () => {
      if (isEditMode) {
         return (
            <Button variant="primary" size="sm" onClick={save}>
               Save
            </Button>
         );
      }
      return (
         <EditIcon
            className="edit-icon-button"
            color="primary"
            onClick={switchToEditMode}
         />
      );
   };

   const listBudgetGroups = props.budgets.map((budget, index) => (
      <Container className="budget-group" fluid key={budget.group_id}>
         <Row className="budget-group-header" key={`header_${budget.group_id}`}>
            <Col xs={5}>
               <InputGroup className="budget-item-input-group">
                  <FormControl
                     disabled={!isEditMode}
                     className={
                        isEditMode
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
               {isEditMode && (
                  <Link onClick={() => deleteGroup(budget.group_id)}>
                     delete group
                  </Link>
               )}
            </Col>
         </Row>
         <ListItem
            items={budget.items}
            group_id={budget.group_id}
            isEditMode={isEditMode}
            deleteItem={deleteItem}
         ></ListItem>
         <Row key={`bottom_${budget.group_id}`}>
            {isEditMode && (
               <div className="bottom-row">
                  <Button
                     onClick={() => addItem(index, budget.items)}
                     variant="link"
                  >
                     Add Item
                  </Button>
               </div>
            )}
            {!isEditMode && (
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
         <div className="edit-buttons-container">{renderEditButton()}</div>
         <div>{listBudgetGroups}</div>
      </div>
   );
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
                  className="delete-row-button"
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
