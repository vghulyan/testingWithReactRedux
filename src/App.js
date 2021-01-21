import React from 'react';
import PropTypes from 'prop-types';
import Header from './component/header';
import Headline from "./component/headline";
import SharedButton from "./component/button";
import Canvas from "./component/canvas";
import { connect } from 'react-redux';
import { fetchWalletMoney } from './actions';
import './app.scss';

function App({ wallet, fetchWalletMoney }) {

    const fetch = () => {
        fetchWalletMoney();
    }

    const configButton = {
        buttonText: 'Get Wallet Money',
        emitEvent: fetch
    };

    return (
        <div className="App" data-test='appComponent'>
          <Header />
          <section className="main">
              <Headline header='Wallet' desc='Click the button to render wallet!' />
              <SharedButton {...configButton} />

              { wallet && <Canvas title={wallet.title} rate={wallet.rate} /> }
          </section>
        </div>
    );
}

App.propTypes = {
    wallet: PropTypes.object,
    fetchWalletMoney: PropTypes.func
};

const mapStateToProps = state => {
    return {
        wallet: state.wallet
    }
};

export default connect(mapStateToProps, { fetchWalletMoney } )(App);
