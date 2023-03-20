import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  componentDidUpdate() {
    const arrGlobalState = [];
    const { expenses } = this.pŕops;
    const arrFunc = () => {
      arrGlobalState.push(expenses);
      return arrGlobalState;
    };
    console.log(arrFunc);
  }

  render() {
    const { expenses } = this.props;
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
          {/* <td>{this.arrFunc()}</td> */}
          <tr />
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
