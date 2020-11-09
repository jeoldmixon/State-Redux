import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategories,
  updateCurrentCategory,
} from "../../utils/actions.js";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CATEGORIES } from "../../utils/queries";

import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);
  const handleClick = (id) => {
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
