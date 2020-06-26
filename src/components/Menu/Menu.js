import React from "react";
import classes from "./Menu.module.css";

const Menu = (props) => {
  const cls = [classes.Menu];
  if (props.menuIsOpen) {
    cls.push(classes.open);
  }
  return (
    <React.Fragment>
      <nav className={cls.join(" ")}></nav>
    </React.Fragment>
  );
};

export default Menu;
