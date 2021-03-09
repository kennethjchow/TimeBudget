import "./Sections.css";

function Section(props) {
   const budgets = props.budgets;
   const listBudgetGroups = budgets.map((budget) => (
      <div className="budget-group">
         <div className="budget-group-header">
            <span className="budget-group-header-name">{budget.group_name}</span>
            <span className="budget-group-header-column">Budgeted</span>
            <span className="budget-group-header-column">Spent</span>
         </div>
         {/* <ListItem items={budget.items}></ListItem> */}
      </div>
   ));
   return <div className="section">{listBudgetGroups}</div>;
}

function ListItem(props) {
   const items = props.items;
   const listBudgetGroups = items.map((item) => (
      <div>
         <span>{item.item_name}</span>
         <span className="time-budgeted">{item.time_budgeted}</span>
         <span className="spent-time">{item.time_spent}</span>
      </div>
   ));
   return <div className="section">{listBudgetGroups}</div>;
}

export default Section;
