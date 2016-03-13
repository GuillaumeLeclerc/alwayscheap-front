import React from 'react'
import {connect} from 'react-redux'

import ProductList from '../presentation/ProductList.js'

const stateToProp = (state) => {
  return {
    products: state.products.basket,
    currentBarCode: state.barcode
  };
}

export default connect(stateToProp)(ProductList);
