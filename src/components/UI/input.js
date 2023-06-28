import Classes from "./input.module.css";
import React from "react";

const Input = (props, ref) => {
  return (
    <div className={Classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref}{...props.input}></input>
    </div>
  );
};

export default React.forwardRef(Input);
