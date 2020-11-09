import { combineReducers } from "redux";
import cartOpenReducer from "./cartOpenReducer";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";
import currentCategoryReducer from "./currentCategoryReducer";
import productsReducer from "./productsReducer";

export const reducer = combineReducers({
  cart: cartReducer,
  cartOpen: cartOpenReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer,
  products: productsReducer,
});

export default reducer;
