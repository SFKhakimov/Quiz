import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';

export default class Auth extends Component {
  state = {
    formValid: false,
    formsElements: {
      email: {
        value: '',
        label: 'Email',
        type: 'email',
        touche: false,
        valid: false,
        errorMessage: 'Введите корректный email',
        validate: {
          required: true,
          email: true,
        },
        password: {
          value: '',
          label: 'Пароль',
          type: 'password',
          touche: false,
          valid: false,
          errorMessage: 'Введите корректный пароль',
          validate: {
            required: true,
            minLength: 6,
        },
      },
    },
  },
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h2>Авторизоваться</h2>
          <form>
            <Input name={this.state.label}></Input>
            <Input name={this.state.label}></Input>
          </form>
        </div>
      </div>
    );
  }
}