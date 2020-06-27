import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  const cls = [classes.Select, props.type];
  return (
    <div className={cls.join(" ")}>
      <label>{props.label}</label>
      <select onChange={props.onChange}>
        {Object.keys(props.options).map((elem, index) => {
          const option = props.options[elem];
          return (
            <option key={option + index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
