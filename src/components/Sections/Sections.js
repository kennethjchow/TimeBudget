import "./Sections.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function Section(props) {
   const budgets = props.budgets;
   const listBudgetGroups = budgets.map((budget) => (
      <div className="budget-group">
         <div className="budget-group-header budget-item-input-group">
            <InputGroup
               className="budget-group-header-name"
            >
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
      </div>
   ));
   return <div>{listBudgetGroups}</div>;
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
         <ProgressBar className="budget-item-progress" now={calculatePercentDiff(item.time_budgeted, item.time_spent)} />
      </div>
   ));
   return <div>{listBudgetItems}</div>;
}

function calculatePercentDiff (max, current) {
   const value = Math.abs((max-current)/ max * 100 - 100)
   return value
}

export default Section;
