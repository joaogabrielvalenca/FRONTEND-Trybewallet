import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header>
        <h5 data-testid="email-field">{email}</h5>
        <h5>Gastos</h5>
        <h5 data-testid="total-field">{ totalExpenses }</h5>
        <h5>Câmbio</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </header>
    );
  }
}

Header.propTypes = {
  email: Proptypes.string.isRequired,
  totalExpenses: Proptypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
