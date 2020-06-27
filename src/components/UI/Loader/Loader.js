import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => {
  const cls = [classes.Loader, "fa fa-spinner fa-spin fa-3x fa-fw"];
  return <i className={cls.join(" ")} aria-hidden="true"></i>;
};

export default Loader;
