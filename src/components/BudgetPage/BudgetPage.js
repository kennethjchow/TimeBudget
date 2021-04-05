import { useEffect, useState } from "react";
import Sections from "../Sections/Sections";
import moment from "moment";
import "./BudgetPage.css";
import AddTimeButton from "../AddTimeButton/AddTimeButton";
import API from "../../utils/api";

import _ from "lodash";
function BudgetPage(props) {
   const [budgets, setBudgets] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [hoursLeft, setHoursLeft] = useState(172);

   useEffect(() => {
      let api_util = new API();
      api_util.getBudgetCategories().then((res) => {
         setBudgets(res.data);
         setHoursLeft(calcTimeRemaining(res.data));

         setIsLoading(false);
      });
   }, []);

   const addItem = (index, budgetItems) => {
      budgetItems.push({
         item_id: 1000,
         item_name: "TESTING",
         time_budgeted: 56,
         time_spent: 3,
      });
      const budgets_copy = [...budgets];
      budgets_copy[index]["items"] = budgetItems;
      setBudgets(budgets_copy);
   };

   const deleteItem = (item, group_id) => {
      let budgets_copy = [...budgets];
      let items = budgets_copy.find((x) => x.group_id === group_id).items;
      _.remove(items, { item_id: item.item_id });
      setBudgets(budgets_copy);
   };

   const deleteGroup = (group_id) => {
      let budgets_copy = [...budgets];
      _.remove(budgets_copy, { group_id: group_id });
      setBudgets(budgets_copy);
      // this.setState({ budgets: budgets });
   };

   const onGroupRename = (index, budget) => {
      console.log(budget.group_name);
   };

   const calcTimeRemaining = (budgets) => {
      let sum = 0;
      budgets.forEach(function (budget, index) {
         budget.items.forEach(function (item, index) {
            sum += item.time_budgeted;
         });
      });
      console.log(sum);
      return 172 - sum;
   };

   // const timeLeft = calcTimeRemaining(); // TODO: Fix this so that it's bound to div

   const startOfWeek = moment().startOf("isoweek").format("MMMM Do");
   const endOfWeek = moment().endOf("isoweek").format("MMMM Do");
   const year = moment().startOf("isoweek").format("YYYY");
   return (
      <div className="budget-page">
         {!isLoading && (
            <div>
               <div className="header">
                  <h5 className="headerYear">{year}</h5>
                  <h1 className="headerDate">
                     {startOfWeek} - {endOfWeek}
                  </h1>
                  <div>{hoursLeft} hours left to plan</div>
               </div>
               <div className="budgets">
                  <Sections
                     budgets={budgets}
                     onAddItem={addItem}
                     onDeleteGroup={deleteGroup}
                     onDeleteItem={deleteItem}
                  ></Sections>
               </div>
            </div>
         )}
      </div>
   );
}

export default BudgetPage;
