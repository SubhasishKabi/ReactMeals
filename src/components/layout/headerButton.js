import CartIcon from "../cart/cartIcon";
import Classes from "./headerButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  //console.log(numberOfCartItems)

  const btnClasses = `${Classes.button} ${
    btnIsHighlighted ? Classes.bump : ""
  }`;
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);
    const timer =  setTimeout(() => {
      setBtnIsHighlighted(false);
    },300);

    return() => {
      clearTimeout(timer)
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={Classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={Classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderButton;
