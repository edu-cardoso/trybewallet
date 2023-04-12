import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, savesExpenses } from '../redux/actions';
import fetchAPI from '../services/fetchAPI';

class Wallet extends Component {
  state = {
    value: '',
    currencie: 'USD',
    paymentMethod: 'Dinheiro',
    category: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { dispatch, expenses } = this.props;
    const { value, currencie, paymentMethod, category, description } = this.state;

    const newValue = value.replace(',', '.');

    const getAPI = await fetchAPI();
    const id = expenses.length;
    const exchangeRates = getAPI;
    dispatch(savesExpenses({ id,
      value: newValue,
      description,
      currency: currencie,
      method: paymentMethod,
      tag: category,
      exchangeRates,
    }));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currencie, paymentMethod, category, description } = this.state;

    return (
      <form onSubmit={ this.submitForm }>
        <label>
          Valor:
          <input
            type="text"
            name="value"
            value={ value }
            onChange={ this.onInputChange }
            data-testid="value-input"
          />
        </label>
        <label>
          Moeda:
          <select
            name="currencie"
            value={ currencie }
            onChange={ this.onInputChange }
            data-testid="currency-input"
          >
            {currencies.map((currency) => (
              <option key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label>
          Método de pagamento:
          <select
            name="paymentMethod"
            value={ paymentMethod }
            onChange={ this.onInputChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria:
          <select
            name="category"
            value={ category }
            onChange={ this.onInputChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
            data-testid="description-input"
          />
        </label>
        <button>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
