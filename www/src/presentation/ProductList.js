import React from 'react';
import conv from '../utils/pureComponentToClass.js'
import RaisedButton from 'material-ui/lib/raised-button';
import Product from './Product.js'
import TextField from 'material-ui/lib/text-field';
import {change as changeBarCode} from '../store/barcode.js'
import _ from 'lodash'
import Paper from 'material-ui/lib/paper';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import PayIcon from 'material-ui/lib/svg-icons/action/payment';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';

import {clear as emptyCart, add as addProduct, remove as removeProduct} from '../store/products.js'
import {open as openPayement} from '../store/payement.js'
import Payement from '../containers/PayementScreen.js'

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

const style = {
  margin: '120px'
};

const containerStyle = {
  clear: 'both'
}

export default conv(function ({products, dispatch, currentBarCode}) {
  const addNew = () => {
    dispatch(addProduct(currentBarCode));
  }

  const add = id => {
    return () => {
      dispatch(addProduct(id));
    }
  }
  const remove = id => {
    return () => {
      dispatch(removeProduct(id));
    }
  }

  const empty = () => {
    dispatch(emptyCart());
  }

  const inputChanged = (event) => {
    dispatch(changeBarCode(event.target.value));
  }

  const pay = () => dispatch(openPayement());
  const localStlyes = getMuiTheme();
  const totalPrice = Math.round(100* _.sumBy(products, (p) => p.count * p.finalPrice))/100.0;
  const totalPriceBefore = Math.round(100 * _.sumBy(products, (p) => p.count * p.startPrice))/100.0;
  const isEmpty = totalPrice===0;

  return (
    <div>
    {
      products.map((p, index) => {
        return (
          <div style={containerStyle} key={p.id}>
            <Product product={p} add={add(p.id)} remove={remove(p.id)}/>
          </div>
        );
      })
    }
      <Paper style={{margin: "50px 0 50px 0"}} zDepth={5} >
        <Card
          expandable={false}
        >
          <CardHeader
            title={"Total: " + totalPrice}
            subtitle={"Before reductions: " + totalPriceBefore}
            style={{background: localStlyes.baseTheme.palette.accent2Color}}
          />
          <CardActions>
            <RaisedButton secondary={true} disabled={isEmpty} label="Pay Now" icon={<PayIcon/>} onTouchTap={pay}/>
            <RaisedButton secondary={false} onTouchTap={empty} disabled={isEmpty} label="Clear my cart" icon={<ClearIcon/>}/>
          </CardActions>
        </Card>
      </Paper>
      <Payement totalPrice={totalPrice}/>
    </div>
  );
})
