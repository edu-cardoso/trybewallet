import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';
import styles from './Table.module.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className={ styles.tableContainer }>
        <thead className={ styles.tableHeadContainer }>
          <tr>
            <th className={ styles.tableTitle }>Descrição</th>
            <th className={ styles.tableTitle }>Tag</th>
            <th className={ styles.tableTitle }>Método de pagamento</th>
            <th className={ styles.tableTitle }>Valor</th>
            <th className={ styles.tableTitle }>Moeda</th>
            <th className={ styles.tableTitle }>Câmbio utilizado</th>
            <th className={ styles.tableTitle }>Valor convertido</th>
            <th className={ styles.tableTitle }>Moeda de conversão</th>
            <th className={ styles.tableTitle }>Editar/Excluir</th>
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
                  <td className={ styles.tableData }>{description}</td>
                  <td className={ styles.tableData }>{tag}</td>
                  <td className={ styles.tableData }>{method}</td>
                  <td className={ styles.tableData }>{Number(value).toFixed(2)}</td>
                  <td className={ styles.tableData }>{currencyName}</td>
                  <td className={ styles.tableData }>{exchangeRate}</td>
                  <td className={ styles.tableData }>{currencyInReal}</td>
                  <td className={ styles.tableData }>Real</td>
                  <td className={ styles.tableData }>
                    <button
                      className={ styles.deleteExpenseBtn }
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
