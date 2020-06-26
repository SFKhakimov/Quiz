import React from "react";
import classes from "./Menu.module.css";
import { NavLink } from "react-router-dom";

const link = [
  { to: "/", name: "Активный тест", exact: true },
  { to: "/auth", name: "Авторизация", exact: false },
  { to: "/create-quiz", name: "Создать тест", exact: false },
];

const Menu = (props) => {
  const cls = [classes.Menu];
  if (props.menuIsOpen) {
    cls.push(classes.open);
  }
  return (
    <React.Fragment>
      <nav className={cls.join(" ")}>
        <ul>
          {link.map((elem) => {
            return (
              <li>
                <NavLink
                  to={elem.to}
                  exact={elem.exact}
                  activeClassName={classes.active}
                  onClick={props.onClick}
                >
                  {elem.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Menu;
