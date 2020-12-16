import './BudgetCategory.css';

function BudgetCategory(props) {
  return (
    <div className="category">
      <span className="category-name">{props.name}</span>
      <span className="spent-time">{props.timeSpent}</span>
      <span className="remaining-time">{props.timeBudgeted}</span>
    </div>
  );
}

export default BudgetCategory;
