import React from 'react';
import ImageSlider from './ImageSlider';

class Modal extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <div className="modal-container">
        <button id="close-btn" onClick={this.props.closeModal}>
          <i className="fa fa-times close-icon"></i>
        </button>
        <div id="slider-container">
          <ImageSlider image={data} />
        </div>
      </div>
    );
  }
}

export default Modal;