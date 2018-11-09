import {SET_IMAGES} from './actions';

export const imagesReducer = (state = [], {type, payload}) => {
  switch(type) {
    case SET_IMAGES:
      return payload.images;
    default:
      return state
  }
};
