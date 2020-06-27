import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { checkValidate } from "../../utils/form/form";

export default class Auth extends Component {
  state = {
    formValid: false,
    formsElements: {
      email: {
        value: "",
        label: "Email",
        type: "email",
        touched: false,
        valid: false,
        errorMessage: "Введите корректный email",
        validate: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        label: "Пароль",
        type: "password",
        touched: false,
        valid: false,
        errorMessage: "Введите корректный пароль",
        validate: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  changeHandler = (event, inputName) => {
    const input = { ...this.state.formsElements[inputName] };
    const form = { ...this.state.formsElements };

    input.value = event.target.value;
    input.touched = true;
    input.valid = checkValidate(input.value, input.validate);

    form[inputName] = input;

    let formIsValid = true;

    Object.keys(this.state.formsElements).forEach((elem) => {
      const input = this.state.formsElements[elem];
      if (input.valid) {
        formIsValid = input.valid && formIsValid;
      }
    });

    this.setState(() => {
      return {
        formsElements: form,
        formValid: formIsValid,
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h2>Авторизоваться</h2>
          <form onSubmit={this.submitHandler}>
            {Object.keys(this.state.formsElements).map((elem, index) => {
              const input = this.state.formsElements[elem];
              return (
                <Input
                  name={input.label}
                  type={input.type}
                  value={input.value}
                  errorMessage={input.errorMessage}
                  valid={input.valid}
                  touched={input.touched}
                  onChange={(event) => this.changeHandler(event, elem)}
                  key={input + index}
                ></Input>
              );
            })}
            <Button disabled={!this.state.formValid} type="signin">
              Авторизоваться
            </Button>
            <Button disabled={!this.state.formValid} type="signup">
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
