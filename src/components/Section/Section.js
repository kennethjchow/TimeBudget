import BudgetCategory from "../BudgetCategory/BudgetCategory";
import "./Section.css";

function Section(props) {
  const budgets = props.budgets;
  const listBudgetCategories = budgets.map((budget) => (
    <BudgetCategory
      name={budget.name}
      timeSpent={budget.time_spent}
      timeBudgeted={budget.time_budgeted}
    >
      {budget}
    </BudgetCategory>
  ));
  console.log(budgets)
  return <div className="section">{listBudgetCategories}</div>;
}

export default Section;
