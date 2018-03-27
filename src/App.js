import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

const web3 = global.web3 && new Web3(global.web3.currentProvider);

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    if (!web3) { return }
    web3.eth.getCoinbase((_, cb) => {
      this.setState({coinbase: cb})
      cb && web3.eth.getBalance(cb, (_, balance) => {
        this.setState({balance: balance})
      })
    })
  }
  render() {
    if (!web3) {
      return (
        <p>Please install MetaMask here: <a href="https://metamask.io">https://metamask.io</a> </p>
      )
    }
    const {coinbase, balance} = this.state
    if (coinbase !== undefined && !coinbase) {
      return (
        <p>Please setup your metamask first</p>
      )
    }
    return (
      <div className="App">
        { coinbase && <p>You are {coinbase}</p>}
        { balance && <p>Currently have {balance} </p>}
      </div>
    );
  }
}

export default App;
