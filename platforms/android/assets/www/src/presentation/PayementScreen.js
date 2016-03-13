import React from 'react';
import conv from '../utils/pureComponentToClass.js'
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import qrcode from 'qrcode-js'

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  textAlign: 'center'
};

export default conv(({opened, totalPrice, payed, cancel}) => {
  const actions = [
    <RaisedButton
      label="Cancel"
      onTouchTap={cancel}
    />,
    <RaisedButton
      primary={true}
      label="Paid"
      onTouchTap={payed}
    />
  ]

  var base64 = qrcode.toDataURL("price to pay:" + totalPrice, 4);
  return (
    <Dialog
      title="Present this code to the machine"
      modal={true}
      actions={actions}
      contentStyle={customContentStyle}
      open={opened}
    >
      <img src={base64}/>
    </Dialog>
  );

});


