import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { checkValidate } from "../../utils/form/form";
import axios from "axios";

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

  signInhHandler = async () => {
    const auth = {
      email: this.state.formsElements.email.value,
      password: this.state.formsElements.password.value,
      returnSecureToken: true,
    };
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI5QMOZZh8GDgEUT_9QNKUzTg-RaTAM8o`,
        auth
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  signUpHandler = async () => {
    const auth = {
      email: this.state.formsElements.email.value,
      password: this.state.formsElements.password.value,
      returnSecureToken: true,
    };
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI5QMOZZh8GDgEUT_9QNKUzTg-RaTAM8o`,
        auth
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
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
            <Button
              disabled={!this.state.formValid}
              type="signin"
              onClick={this.signInhHandler}
            >
              Авторизоваться
            </Button>
            <Button
              disabled={!this.state.formValid}
              type="signup"
              onClick={this.signUpHandler}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
