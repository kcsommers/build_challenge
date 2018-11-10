import React from 'react';
import ImageSlider from './ImageSlider';
import {connect} from 'react-redux';

class Modal extends React.Component {
  render() {
    const data = this.props.data;
    // pass modal data to image slider
    return (
      <div className="modal-container fade-in">
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

const mapStateToProps = (state) => ({images: state.images});
export default connect(mapStateToProps)(Modal);