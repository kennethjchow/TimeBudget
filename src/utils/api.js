import axios from "axios";


export default class API {

   getBudgetCategories = () => axios.get('../../budgetCategories.json')

}