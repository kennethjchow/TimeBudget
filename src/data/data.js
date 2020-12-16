class BudgetCategories {
    constructor(){
        this.budgetCategories = [
            {
               name:'Work',
               time_spent: '0',
               time_budgeted:'8'
            },
            {
               name:'Swag',
               time_spent: '0',
               time_budgeted:'8'
            }
         ];
    }

    get budgetCategories() {
        return this._budgetCategories;
    }
    set budgetCategories(budgetCategories) {
        this._budgetCategories = budgetCategories;
    }
}

export default BudgetCategories