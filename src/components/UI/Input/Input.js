import React from "react";
import classes from "./Input.module.css";

function isInValid({ valid, touched }) {
  return !valid && touched;
}

const Input = (props) => {
  const inputId = `${props.type}-${Math.random()}`;
  const inputType = props.type || "text";
  const cls = [classes.Input];
  if (props.class) {
    cls.push(props.class);
  }
  return (
    <div className={cls.join(" ")}>
      <label htmlFor={inputId}>{props.name}</label>
      <input
        id={inputId}
        type={inputType}
        onChange={props.onChange}
        value={props.value}
      />
      {isInValid(props) ? (
        <span>{props.errorMessage || "Введите верное значение"}</span>
      ) : null}
    </div>
  );
};

export default Input;
