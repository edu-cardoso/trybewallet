import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const expensesInReal = expenses
      .map((item) => item.value * item.exchangeRates[item.currency].ask);
    const total = expensesInReal.reduce((acc, curr) => acc + curr, 0);
    return (
      <>
        <p data-testid="email-field">
          Email:
          {' '}
          { email }
        </p>
        <p>Despesa Total: R$</p>
        <p data-testid="total-field">
          {total.toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </>
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
