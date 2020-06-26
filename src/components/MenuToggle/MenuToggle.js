import React from "react";
import classes from "./MenuToggle.module.css";

const MenuToggle = (props) => {
  const cls = [classes.MenuToggle, "fa fa-2x"];

  if (props.menuIsOpen) {
    cls.push(classes.open, "fa-times");
  } else {
    cls.push("fa-bars");
  }
  return <i className={cls.join(" ")} onClick={props.onClick}></i>;
};

export default MenuToggle;
