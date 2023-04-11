import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUserEmail } from '../redux/actions';

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
      <>
        <input
          type="text"
          name="email"
          value={ email }
          onChange={ this.onInputChange }
          data-testid="email-input"
        />

        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.onInputChange }
          data-testid="password-input"
        />

        <Link to="/carteira">
          <button
            onClick={ () => dispatch(saveUserEmail(email)) }
            disabled={ !validateLogin }
          >
            Entrar
          </button>
        </Link>
      </>
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
