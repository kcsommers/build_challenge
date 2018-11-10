import React from 'react';
import ImageSlider from './ImageSlider';
import {connect} from 'react-redux';

const Modal = (props) => {
  const data = props.data;
  // pass modal data to image slider
  return (
    <div className="modal-container fade-in">
      <button id="close-btn" onClick={props.closeModal}>
        <i className="fa fa-times close-icon"></i>
      </button>
      <div id="slider-container">
        <ImageSlider closeModal={props.closeModal} image={data} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({images: state.images});
export default connect(mapStateToProps)(Modal);