import PropTypes from 'prop-types'
import { CurrencyDetail } from './enum'

const CurrencyConvertorInt = (number, isCurrencyType = false) => {
  if (number) {
    const currency = isCurrencyType ? CurrencyDetail.USA : ''
    // Nine Zeroes for Billions
    return Math.abs(Number(number)) >= 1.0e9
      ? currency + (Math.abs(Number(number)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(number)) >= 1.0e6
      ? currency + (Math.abs(Number(number)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(number)) >= 1.0e3
      ? currency + (Math.abs(Number(number)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(number))
      ? currency + Math.abs(Number(number)).toFixed(2)
      : Math.abs(Number(number))
  }
}
CurrencyConvertorInt.propTypes = {
  number: PropTypes.number,
  isCurrencyType: PropTypes.bool
}

export default CurrencyConvertorInt
