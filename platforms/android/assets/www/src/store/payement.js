const OPEN = 'PAYEMENT_WINDOW_OPEN';
const CLOSE = 'PAYEMENT_WINDOW_CLOSE';

const change = (type) => {
  return () => {
    return dispatch => {
      dispatch({
        type
      });
    }
  }
}

export const open = change(OPEN);
export const close = change(CLOSE);

export default (opened = false, {type}) => {
  switch(type) {
    case OPEN:
      return true;
    case CLOSE:
      return false;
    default:
      return opened;
  }
}
