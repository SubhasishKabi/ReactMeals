import Modal from "../UI/modal";
import Classes from "./cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./cartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1})
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  return (
    <Modal onClose={props.onClose}>
      <ul className={Classes["cart-items"]}>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd = {cartItemAddHandler.bind(null, item)}
            ></CartItem>
          );
        })}
      </ul>
      <div className={Classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={Classes.actions}>
        <button className={Classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={Classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
