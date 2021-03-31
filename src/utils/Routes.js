import BudgetPage from "../components/BudgetPage/BudgetPage";
import CalendarPage from "../components/CalendarPage/CalendarPage";

const Routes = [
   {
     path: '/budget',
     sidebarName: 'Budget',
     component: BudgetPage
   },
   {
     path: '/calendar',
     sidebarName: 'Calendar',
     component: CalendarPage
   },
 ];
 
 export default Routes;