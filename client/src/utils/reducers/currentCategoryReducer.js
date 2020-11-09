import { UPDATE_CURRENT_CATEGORY } from "../../utils/types";

const currentCategoryReducer = (state = "", action) => {
  switch (action.type) {
    case UPDATE_CURRENT_CATEGORY:
      return action.currentCategory;
    default:
      return state;
  }
};

export default currentCategoryReducer;
