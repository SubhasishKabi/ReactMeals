import React from "react";
import mealsImage from "../../assets/meals.jpg";
import Classes from "./header.module.css";
import HeaderButton from "./headerButton";

export default function Header(props) {
  return (
    <>
      <header className={Classes.header}>
        <h1>React Meals</h1>
        <HeaderButton onClick ={props.onShowCart}></HeaderButton>
      </header>
      <div className={Classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </>
  );
}
