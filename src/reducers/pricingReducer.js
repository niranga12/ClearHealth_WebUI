const { SHOW_PRICE_DATA } = require('src/constansts')

const initialState = {
  feeSchedule: [],
  package: null,
  filterDetail: null
}

const pricingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PRICE_DATA:
      return (state = action.payload)

    default: {
      return state
    }
  }
}

export default pricingReducer
