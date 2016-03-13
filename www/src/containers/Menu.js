import React from 'react'
import {connect} from 'react-redux'

import Menu from '../presentation/Menu.js'
import {askUser} from '../store/products.js'


const stateToProp = (state) => {
  return {
  };
}

const dispatchertoProp = (dispatcher) => {
  return {
    askUser: () => {
      dispatcher(askUser());
    }
  }
}

export default connect(stateToProp, dispatchertoProp)(Menu);
