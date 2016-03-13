import React, {Component} from 'react'

export default (f) => {
  class C extends Component {
    render() {
      return f.bind(this)(this.props);
    }
  }
  C.propTypes = f.propTypes;
  return C;
}
