import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   const fetchApiDataToCurrencies = async () => {
  //     const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  //     const requestJson = await request.json();
  //     const bruteRequest = Object.keys(requestJson);
  //     const refinedRequest = bruteRequest.filter((currency) => currency !== 'USDT');
  //     return dispatch(addCurrencies(refinedRequest));
  //   };
  //   fetchApiDataToCurrencies();
  // }

  render() {
    // const { currencies } = this.props;
    return (
      <>
        <Header />
        <main>
          <WalletForm
            // coin1={ currencies[0] }
            // coin2={ currencies[1] }
            // coin3={ currencies[2] }
            // coin4={ currencies[3] }
            // coin5={ currencies[4] }
            // coin6={ currencies[5] }
            // coin7={ currencies[6] }
            // coin8={ currencies[7] }
            // coin9={ currencies[8] }
            // coin10={ currencies[9] }
            // coin11={ currencies[10] }
            // coin12={ currencies[11] }
            // coin13={ currencies[12] }
            // coin14={ currencies[13] }
            // coin15={ currencies[14] }
          />
        </main>
        <footer>
          <Table />
        </footer>
      </>
    );
  }
}

Wallet.propTypes = {

};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
