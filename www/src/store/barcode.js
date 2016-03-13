const CHANGE = 'BARCODE_CHANGE';

export const change = value => {
  return dispatch => {
    dispatch({
      type: CHANGE,
      newVal: value
    });
  }
}

export default (currentBarCode = 5997523317072, v) => {
  switch (v.type) {
    case CHANGE: 
      return v.newVal;
    default:
      return currentBarCode;
  }
}
