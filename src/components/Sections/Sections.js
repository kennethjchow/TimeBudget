import "./Sections.css";

function Section(props) {
   const budgets = props.budgets;
   const listBudgetCategories = budgets.map((budget) => (
      <div className="category">
         <span className="category-name">{budget.name}</span>
         <span className="spent-time">{budget.time_spent}</span>
         <span className="remaining-time">{budget.time_budgeted}</span>
      </div>
   ));
   return <div className="section">{listBudgetCategories}</div>;
}

export default Section;
