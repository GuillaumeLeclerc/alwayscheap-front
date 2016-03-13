import React from 'react';
import conv from '../utils/pureComponentToClass.js'


import Avatar from 'material-ui/lib/avatar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import AddIcon from 'material-ui/lib/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/lib/svg-icons/content/remove-circle';
import HardwareVideogameAsset from 'material-ui/lib/svg-icons/hardware/videogame-asset';
import Paper from 'material-ui/lib/paper';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Badge from 'material-ui/lib/badge';
import CircularProgress from 'material-ui/lib/circular-progress';



const avatarStyle = {
  margin: '10px'
}

const titleStyle = {
  marginLeft: '25px'
}

export default conv(({product, add, remove}) =>  {

  let content = (
    <Paper style={{textAlign: 'center'}}>
      <CircularProgress />
    </Paper>
  )

  if (!product.loading) {
    content = (
      <Paper>
      <Card>
      <CardHeader
        title={
          <Badge style={{padding: 0, margin: 0}} badgeStyle={{right: -30, top: -3}}badgeContent={product.count} primary={true}>{product.title}</Badge>
        }
        subtitle={<span>{product.count + " x " + Math.round(product.finalPrice * 100)/100.0 + " = "} <b>{Math.round(100* product.finalPrice * product.count)/100.0 +  ".- CHF"}</b></span>}
        avatar={product.image}
      />
      <CardActions>
        <RaisedButton label="Add more" icon={<AddIcon />} onTouchTap={add} />
        <RaisedButton label="Remove"  icon={<RemoveIcon/>} onTouchTap={remove}/>
      </CardActions>
      </Card>
      </Paper>
    )
  }

  return content;
})
