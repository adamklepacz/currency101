import React from 'react';
import image from '../images/cash-calculator.svg';
import data from './data/Data';
import SelectCurrency from './components/SelectCurrency.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currencies: data.currencies,
      currencyA: data.currencies[0],
      currencyB: data.currencies[1],
      currencyAval: data.currencies[0].sellRate,
      currencyBval: data.currencies[1].sellRate,
      wrongValue: false
    }

    this.onSelectCurrency = this.onSelectCurrency.bind(this);
  }

  onSelectCurrency(code) {
    const {currencies, currencyBval, currencyAval} = this.state;
    const chosenCurr = currencies.filter(currency => currency.code === code);

    this.setState({
      currencyB: chosenCurr[0],
      currencyBval: currencyAval * chosenCurr[0].sellRate
    })

  }

  onChangeHandler(e, currency) {
    const {currencyA, currencyB, currencyAval, currencyBval} = this.state;

    if(currency === 'A') {
      let newAValue = e.target.value;
      this.setState({
        currencyAval: newAValue,
        currencyBval: newAValue * currencyB.sellRate
      })
    } else if(currency === 'B') {
      let newBValue = e.target.value;
      this.setState({
        currencyBval: newBValue,
        currencyAval: newBValue / currencyB.sellRate
      })
    }
  }

  avoidNegativeAmounts(e) {
    this.setState({
      wrongValue: false
    })

    if(e.target.value <= 0) {
      this.setState({
        currencyAval: 0,
        currencyBval: 0,
        wrongValue: true
      })
    }
  }

  render(){
    const {currencies, currencyA, currencyB, currencyAval, currencyBval, wrongValue} = this.state;

    return (
      <div>
        <header>
          <img src={image} />
          <h1>Currency Converter</h1>
        </header>
        <div className="content">
          <div className="row row-select-currency">
            <div className="col-md-6">
              <h2>Select Currency</h2>
              <p>
                {
                  //Select currency
                }
                <SelectCurrency
                  currencies={currencies}
                  onSelectCurrency={this.onSelectCurrency}
                />
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 currency-from-input">
              <h3 className={`currency-flag ${currencyA.code}`}>{currencyA.name}</h3>
              {
                  //Currency A input
              }
              <div className="input-group">
                <span className="input-group-addon">{currencyA.sign}</span>
                <input type="number" value={currencyAval} className="form-control" aria-describedby="basic-addon2" step="1" pattern="\d\.\d{2}"  onChange={(e) => {
                    this.onChangeHandler(e, 'A');
                    this.avoidNegativeAmounts(e);
                  }}/>
                <span className="input-group-addon" id="basic-addon2">{currencyA.code}</span>
              </div>

            </div>
            <div className="col-sm-6 currency-to-input">
              <h3 className={`currency-flag ${currencyB.code}`}>{currencyB.name}</h3>
              {
                  //Currency B input
              }
              <div className="input-group">
                <span className="input-group-addon">{currencyB.sign}</span>
                <input type="number" value={currencyBval} className="form-control" aria-describedby="basic-addon3" step="1" pattern="\d\.\d{2}" onChange={(e) => {
                    this.onChangeHandler(e, 'B');
                    this.avoidNegativeAmounts(e);
                  }} />
                <span className="input-group-addon" id="basic-addon3">{currencyB.code}</span>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {
                  //Update to currently selected currency
              }
              <ErrorMessage wrongValue={wrongValue}/>
              <p>

                {`Exchange Rate ${currencyA.sign} 1 ${currencyA.code} = ${currencyB.sign} ${currencyB.sellRate} ${currencyB.code}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
