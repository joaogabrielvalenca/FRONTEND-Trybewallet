import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Header extends Component {
  getOutcomes = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    const result = expenses.reduce((acc, currVal) => {
      const { ask } = currVal.exchangeRates[currVal.currency];
      const exchange = Number(currVal.value) * Number(ask);
      return acc + exchange;
    }, 0).toFixed(2);
    return result;
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h5 data-testid="email-field">{email}</h5>
        <h5>Gastos</h5>
        <h5 data-testid="total-field">{this.getOutcomes()}</h5>
        <h5>Câmbio</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </header>
    );
  }
}

Header.propTypes = {
  email: Proptypes.string.isRequired,
  expenses: Proptypes.arrayOf({}).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
