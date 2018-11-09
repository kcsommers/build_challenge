import React from 'react';
import ImageSlider from './ImageSlider';

class Modal extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <div className="modal-container">
        <div id="slider-container">
          <ImageSlider image={data} />
        </div>
      </div>
    );
  }
}

export default Modal;