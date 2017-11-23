import React from 'react';
import PropTypes from 'prop-types';

const SelectCurrency = (props) => {
  const {currencies, onSelectCurrency} = props;
  const filteredCurrencies = currencies.filter(currency => currency.code !== 'AUD');

  return (
    <select onChange={(e) => onSelectCurrency(e.target.value)}>
      {
        filteredCurrencies.map(currencyOption => {
          const {code, name} = currencyOption;
          return <option value={code} key={code}>{name}</option>
        })
      }
    </select>
  )
}

SelectCurrency.propTypes = {
  currencies: PropTypes.array,
  onSelectCurrency: PropTypes.func
}
export default SelectCurrency;
