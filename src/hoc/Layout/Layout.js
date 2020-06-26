import React, { Component } from "react";
import classes from "./Layout.module.css";
import Menu from "../../components/Menu/Menu";
import MenuToggle from "../../components/MenuToggle/MenuToggle";
import Overlay from "../../components/UI/Overlay/Overlay";

export default class Layout extends Component {
  state = {
    menuIsOpen: false,
  };

  clickHandler = () => {
    this.setState(() => {
      return {
        menuIsOpen: !this.state.menuIsOpen,
      };
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Menu menuIsOpen={this.state.menuIsOpen} onClick={this.clickHandler} />
        {this.state.menuIsOpen ? <Overlay onClick={this.clickHandler} /> : null}
        <MenuToggle
          menuIsOpen={this.state.menuIsOpen}
          onClick={this.clickHandler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
