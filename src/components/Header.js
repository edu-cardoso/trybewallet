import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Header.module.css';
import walletLogo from '../assets/walletLogo.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const expensesInReal = expenses
      .map((item) => item.value * item.exchangeRates[item.currency].ask);

    const total = expensesInReal.reduce((acc, curr) => acc + curr, 0);

    return (
      <header className={ styles.headerContainer }>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />

        <img src={ walletLogo } alt="wallet logo" className={ styles.walletLogo } />
        <div className={ styles.userAndTotal }>
          <div className={ styles.user }>
            <span className="material-symbols-outlined">
              person
            </span>
            <p data-testid="email-field">
              { email }
            </p>
          </div>
          <div className={ styles.total }>
            <p data-testid="total-field">
              {total.toFixed(2)}
              {' '}
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
