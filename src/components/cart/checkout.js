import { useRef, useState } from "react";
import Classes from "./checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

export default function CheckOut(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredNameIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    nameInputRef.current.value =""
    cityInputRef.current.value =""
    streetInputRef.current.value =""
    postalCodeInputRef.current.value=""
  };

  return (
    <form onSubmit={submitHandler} className={Classes.form}>
      <div
        className={`${Classes.control} ${
          formInputsValidity.name ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && <p> Please enter a valid name</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputsValidity.street ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputsValidity.street && <p> Please enter a valid street</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputsValidity.city ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputsValidity.city && <p> Please enter a valid city</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputsValidity.postalCode ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef}></input>
        {!formInputsValidity.postalCode && (
          <p> Please enter a valid postalcode (5 characters long)</p>
        )}
      </div>
      <div className={Classes.actions}>
        <button
          type="button"
          onClick={props.onCancel}
          className={Classes.cancel}
        >
          Cancel
        </button>
        <button type="submit" className={Classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
}
