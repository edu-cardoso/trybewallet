import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUserEmail } from '../redux/actions';
import styles from './Login.module.css';
import walletLogo from '../assets/walletLogo.svg';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password } = this.state;
    const { dispatch } = this.props;

    const regexEmail = /\S+@\S+\.\S+/;
    const minPasswordLength = 6;
    const validateLogin = (password.length >= minPasswordLength
      && regexEmail.test(email));

    return (
      <div className={ styles.loginContainer }>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />

        <div className={ styles.walletContainer }>
          <img src={ walletLogo } alt="wallet logo" className={ styles.walletLogo } />
          <div className={ styles.emailContainer }>
            <span className="material-symbols-outlined">
              person
            </span>
            <input
              type="text"
              name="email"
              value={ email }
              placeholder="Usuário"
              onChange={ this.onInputChange }
              data-testid="email-input"
              className={ styles.emailInput }
            />
          </div>
          <div className={ styles.passwordContainer }>
            <span className="material-symbols-outlined">
              lock
            </span>
            <input
              type="password"
              name="password"
              value={ password }
              placeholder="Senha"
              onChange={ this.onInputChange }
              data-testid="password-input"
              className={ styles.passwordInput }
            />
          </div>
          <Link to="/carteira">
            <button
              onClick={ () => dispatch(saveUserEmail(email)) }
              disabled={ !validateLogin }
              className={ styles.loginBtn }
            >
              Entrar
            </button>
          </Link>
        </div>
        <p className={ styles.developedBy }>
          Desenvolvido em React por
          {' '}
          <a href="https://github.com/edu-cardoso" target="_blank" rel="noreferrer">Eduardo Cardoso</a>
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
