import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { addCurrencies, addExpenses, addTotalExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    outcome: 0,
    description: '',
    currency: '',
    method: '',
    tag: '',
    id: 0,
    arrOfExpenses: [],
    totalOutcome: [],
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await this.fetchApiDataToCurrencies();
    // console.log(data);
    this.setState({ exchangeRates: data });
    const bruteRequest = Object.keys(data);
    const refinedRequest = bruteRequest.filter((currency) => currency !== 'USDT');
    return dispatch(addCurrencies(refinedRequest));
  }

  fetchApiDataToCurrencies = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJson = await request.json();
    return requestJson;
  };

  onOutcomeChange = ({ target }) => {
    const { outcome, totalOutcome } = this.state;
    const { value } = target;
    this.setState({
      outcome: value,
      totalOutcome: [...totalOutcome, outcome],
    });
  };

  onDescritptionChange = ({ target }) => {
    const { description } = this.state;
    const { value } = target;
    this.setState({ description: value });
  };

  onCurrencyHandleChange = (event) => {
    const { target } = event;
    const { currency } = this.state;
    this.setState({ currency: target.value });
  };

  onPaymentHandleChange = (event) => {
    const { target } = event;
    const { method } = this.state;
    this.setState({ method: target.value });
  };

  onCategoryHandleChange = (event) => {
    const { target } = event;
    const { tag } = this.state;
    this.setState({ tag: target.value });
  };

  getOutcomes = () => {
    const { arrOfExpenses } = this.state;
    const outcome = arrOfExpenses.map((value) => {
      const arrayOfRates = Object.values(value.exchangeRates);
      const currentRate = arrayOfRates.find((rate) => rate.code === value.currency);
      return (value.outcome * currentRate.ask);
    });
    console.log(outcome);
    if (outcome.length === 0) return;
    const total = outcome.reduce((acc, currVal) => acc + currVal);
    console.log(total);
    dispatch(addTotalExpenses(total));
    return total;
  };

  onHandleSubmit = async () => {
    const {
      outcome,
      description,
      currency,
      method,
      tag,
      arrOfExpenses,
      id,
      exchangeRates,
    } = this.state;
    const { dispatch } = this.props;

    this.setState({ id: id + 1 });
    const objectOfExpenses = {
      id,
      outcome,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const data = await this.fetchApiDataToCurrencies();
    this.setState({ exchangeRates: data });

    this.setState({ arrOfExpenses: [...arrOfExpenses, objectOfExpenses] });
    dispatch(addExpenses([...arrOfExpenses, objectOfExpenses]));
    this.getOutcomes();
    this.setState({
      description: '',
      outcome: '',
    });
  };

  render() {
    const { currencies } = this.props;
    return (
      <>
        <label htmlFor="outcome">
          Gasto
          <input
            type="number"
            data-testid="value-input"
            onChange={ this.onOutcomeChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            onChange={ this.onDescritptionChange }
          />
        </label>
        <label>
          Câmbio
          <select
            name="currency"
            data-testid="currency-input"
            onClick={ ((e) => this.onCurrencyHandleChange(e)) }
          >
            <option value="USD">{ currencies[0] }</option>
            <option value="CAD">{ currencies[1] }</option>
            <option value="GBP">{ currencies[2] }</option>
            <option value="ARS">{ currencies[3] }</option>
            <option value="BTC">{ currencies[4] }</option>
            <option value="LTC">{ currencies[5] }</option>
            <option value="EUR">{ currencies[6] }</option>
            <option value="JPY">{ currencies[7] }</option>
            <option value="CHF">{ currencies[8] }</option>
            <option value="AUD">{ currencies[9] }</option>
            <option value="CNY">{ currencies[10]}</option>
            <option value="ILS">{ currencies[11] }</option>
            <option value="ETH">{ currencies[12] }</option>
            <option value="XRP">{ currencies[13] }</option>
            <option value="DOGE">{ currencies[14] }</option>
          </select>
        </label>
        <label htmlFor="payment">
          Forma de Pagamento
          <select
            name="payment"
            data-testid="method-input"
            onClick={ (e) => this.onPaymentHandleChange(e) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria
          <select
            name="category"
            data-testid="tag-input"
            onClick={ (e) => this.onCategoryHandleChange(e) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.onHandleSubmit }
        >
          Adicionar Despesa
        </button>
      </>
    );
  }
}

WalletForm.propTypes = {
  currencies: Proptypes.arrayOf.isRequired,
  dispatch: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
