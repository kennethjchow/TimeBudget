import './App.css';
import BudgetPage from './components/BudgetPage/BudgetPage';
import SideNavbar from './components/SideNavbar/SideNavbar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <SideNavbar></SideNavbar>
      <BudgetPage></BudgetPage>
    </div>
  );
}

export default App;
