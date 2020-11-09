import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartQuantity } from "../../utils/actions";

function ProductItem(item) {
  const { image, name, _id, price, quantity } = item;

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { cart } = state;
  const addItemToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if (itemInCart) {
      dispatch(
        updateCartQuantity(_id, parseInt(itemInCart.purchaseQuantity) + 1)
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(addToCart({ ...item, purchaseQuantity: 1 }));
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addItemToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
