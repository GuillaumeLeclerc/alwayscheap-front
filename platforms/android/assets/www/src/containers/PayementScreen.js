import React from 'react'
import {connect} from 'react-redux'

import PayementScreen from '../presentation/PayementScreen.js'
import {open, close} from '../store/payement.js'
import {clear} from '../store/products.js'


const stateToProp = (state) => {
  return {
    opened: state.payement
  };
}

const dispatchertoProp = (dispatcher) => {
  return {
    payed: () => {
      dispatcher(close())
      dispatcher(clear())
    },
    cancel: () => {
      dispatcher(close());
    }
  }
}

export default connect(stateToProp, dispatchertoProp)(PayementScreen);
