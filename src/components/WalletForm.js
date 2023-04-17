/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies,
  savesExpenses,
  deleteExpenses,
  editMode } from '../redux/actions';
import fetchAPI from '../services/fetchAPI';
import styles from './WalletForm.module.css';

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

    const { dispatch } = this.props;
    const { value, currencie, paymentMethod, category, description } = this.state;

    const newValue = value.replace(',', '.');

    const getAPI = await fetchAPI();
    const id = uuidv4();
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
      currencie: 'USD',
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
      description: '',
    });
  };

  sendEditedExpense = (editedExpenseID, edit) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(editedExpenseID));
    dispatch(editMode(edit));
  };

  render() {
    // eslint-disable-next-line react/prop-types, no-shadow
    const { currencies, editMode, editedExpenseID } = this.props;
    const { value, currencie, paymentMethod, category, description } = this.state;

    const onlyNumbers = /^[\d.,]+$/;
    // eslint-disable-next-line no-magic-numbers
    const isValidBtn = (description.length >= 3 && onlyNumbers.test(value));

    return (
      <form onSubmit={ this.submitForm } className={ styles.formContainer }>
        <div className={ styles.formField }>
          <p>Valor:</p>
          <input
            type="text"
            name="value"
            value={ value }
            onChange={ this.onInputChange }
            data-testid="value-input"
          />
        </div>
        <div className={ styles.formField }>
          <p>Moeda:</p>
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
        </div>
        <div className={ styles.formField }>
          <p>Método de pagamento:</p>
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
        </div>
        <div className={ styles.formField }>
          <p>Categoria:</p>
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
        </div>
        <div className={ styles.formField }>
          <p>Descrição:</p>
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
            data-testid="description-input"
          />
        </div>
        { editMode
          ? <button
              className={ styles.addEditedExpenseBtn }
              disabled={ !isValidBtn }
              onClick={ () => this.sendEditedExpense(editedExpenseID, false) }
          >
              Editar despesa
            </button>
          : <button
              disabled={ !isValidBtn }
              className={ styles.addExpenseBtn }
          >
              Adicionar despesa
            </button> }

      </form>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editMode: state.wallet.editMode,
  editedExpenseID: state.wallet.editedExpenseID,
});

export default connect(mapStateToProps)(Wallet);
