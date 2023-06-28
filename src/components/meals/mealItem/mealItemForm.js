import Input from "../../UI/input";
import Classes from "./mealItemForm.module.css";

import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value; //inputs are always strings. hence we need to convert it into number
    const enteredAmountNumber = +enteredAmount;
    // console.log(enteredAmountNumber)
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber)
  };
  return (
    <form className={Classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button >+ Add</button>
      {!amountIsValid && <p>Please enter a valid number(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
