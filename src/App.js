import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.currencies = ["AUD", "CAD", "CNY", "GBP"]
    
    this.state = {
      base: "USD",
      other: "EUR",
      value: 0, 
      converted: 0
    }
  }
  makeSelection = (e) => {
    const {name, value} = e.target;
    this.setState({
     [name]: value
    }, this.recalculate);
  }
  changeValue = (e) => {
    const {value} = e.target;
    this.setState({value: value,
    converted: null},
      this.recalculate);
  }
  recalculate = () => {
    const value = parseFloat(this.state.value);
    if(isNaN(value)) {
      return;
    }

    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        converted: data.rates[this.state.other] * value
      })
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <div className="container">
          <h1>Currency Converter</h1>
            <select onChange={this.makeSelection} name="base" value={this.state.base}>
              {this.currencies.map(currency => 
                <option key={currency} value={currency}>{currency}</option>)}
            </select>
            <input onChange={this.changeValue} type="text" value={this.state.value}/>
          </div>  
          <div>
            <select onChange={this.makeSelection} name="other" value={this.state.other}>
            {this.currencies.map(currency => 
                <option key={currency} value={currency}>{currency}</option>)}
            </select>
            <input type="text" value={this.state.converted === null ? "Calculating..." : this.state.converted} disabled={true}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
