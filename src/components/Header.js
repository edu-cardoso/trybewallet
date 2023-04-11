import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <p data-testid="email-field">
          Email:
          {' '}
          { email }
        </p>
        <p
          data-testid="total-field"
        >
          Despesa Total: R$ 0
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
