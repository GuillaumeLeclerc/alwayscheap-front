import Product from '../models/Product.js'
import _ from 'lodash'
import request from 'superagent'

const ADD = 'PRODUCT_ADD'
const REMOVE = 'PRODUCT_REMOVE'
const INFO_AVAIL = 'PRODUCT_NEW_INFO_AVAILABLE'
const CLEAR = 'PRODUCT_CLEAR_ALL'

const modCart = (action) => {
  return (barcode) => {
    return (dispatcher, state) => {
      setTimeout( () => {
        const cart = state().products.basket
        const query = _.flatMap(cart, (p) => {
          return _.map(_.range(p.count), () => p.id);
        });
        request.post('http://40.118.22.19/')
          .send(query)
          .end((err, {text}) => {
            const parsed = JSON.parse(text);
            dispatcher({
              type: INFO_AVAIL,
              infos: parsed
            });
          });
      });
      dispatcher({
        type: action,
        code: barcode,
      });
    }
  }
}

export const add = modCart(ADD);
export const remove = modCart(REMOVE);
export const clear = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR
    });
  }
}

export const askUser = () => {
  return (dispatch) => {
    if (window.cordova) {
      cordova.plugins.barcodeScanner.scan(({text, canceled}) => {
        if (!canceled && text.length > 0) {
          dispatch(add(text));
        }
      });
    } else {
      alert("Are you stupid ? you are on a browser")
    }
  }
}


const productMerger = (products) => {
  const counts = _.groupBy(products, 'id');
  return _.compact(_.map(counts, (prods, id) => {
    const count =  _.sumBy(prods, 'count');
    if (count > 0) {
      return new Product(id, count, false);
    } else {
      return false;
    }
  }));
}

const productListReducer = (products = [], {type, code}, infos)  => {
  switch (type) {
    case ADD: 
      products = [...products, new Product(code, 1, false)]
      break;
    case REMOVE: 
      products = [...products, new Product(code, -1, false)]
      break;
    case CLEAR:
      products = [];
      break;
  }

  return productMerger(products).map((p) => {
    if (infos[p.id]) {
      return new Product(p.id, p.count, infos[p.id]);
    } else {
      return p;
    }
  });
}

export default (data = {basket: [], infos: []}, action) => {
  let {basket, infos} = data;
  if (action.type === INFO_AVAIL) {
    infos = [];
    action.infos.forEach((p) => {
      infos[p.id] = p;
    });
  }
  return {
    basket: productListReducer(basket, action, infos),
    infos
  }
};
