import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleRemoveExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(expense));
    console.log(expense);
  };

  handleEditExpense = () => {
    const a = 'a';
    return a;
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>

            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const exchangeList = Object.values(expense.exchangeRates);
            const currentCurrency = exchangeList.find(
              (item) => item.code === expense.currency,
            );
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.currency}</td>
                <td>{Number(currentCurrency.ask).toFixed(2)}</td>
                <td>{(expense.value * currentCurrency.ask).toFixed(2)}</td>
                <td>{currentCurrency.name}</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditExpense() }
                  >
                    Editar despesa
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleRemoveExpense(expense) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: Proptypes.func.isRequired,
  expenses: Proptypes.arrayOf({}).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
