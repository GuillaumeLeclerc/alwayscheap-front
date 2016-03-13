import React  from 'react';
import AppBar from 'material-ui/lib/app-bar';
import AddIcon from 'material-ui/lib/svg-icons/action/add-shopping-cart';
import IconButton from 'material-ui/lib/icon-button';
import conv from '../utils/pureComponentToClass.js'

const addIconStyle = {
  fill: 'white',
}
export default conv(({askUser}) => {
  console.log(askUser);
  return (
    <AppBar
      title="Migros shopping app"
      iconElementRight={<IconButton onTouchTap={askUser}><AddIcon style={{fill: 'white'}} /></IconButton>}
      iconStyleRight={addIconStyle}
    />
  );
});
