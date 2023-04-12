import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {
            expenses.map(({
              id, description, tag, method, value, exchangeRates, currency,
            }) => {
              const currencyInReal = Number(exchangeRates[currency].ask * value)
                .toFixed(2);
              const currencyName = exchangeRates[currency].name.split('/')[0];
              const exchangeRate = Number(exchangeRates[currency].ask).toFixed(2);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currencyName}</td>
                  <td>{exchangeRate}</td>
                  <td>{currencyInReal}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => dispatch(deleteExpenses(id)) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
