import React from 'react';
import {connect} from 'react-redux';
import Slide from './Slide'

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // find the index of the image prop in redux store  
      currentImageIndex: this.props.images.findIndex((img) => img.id === this.props.image.id),
    }
  }

  _slide = (n) => {
    let index = this.state.currentImageIndex;
    let imagesArr = this.props.images;
    let length = imagesArr.length
    // increment or decrement the index by n
    // looping to the beginning or the end of array depending on current index
    if(index === 0 && n === -1) index = length - 1;
    else if(index === length - 1 && n === 1) index = 0;
    else index += n;
    this.setState({currentImageIndex: index});
  }

  render() {
    let index = this.state.currentImageIndex;
    let imagesArr = this.props.images;

    let slidesMapped = imagesArr.map((img, i) => {
      // create a slide for each image in redux store
      return <Slide image={img} key={i} />
    });

    // display the slide at the found index
    let currentSlide = [slidesMapped[index]];
    return (
      <div id="slider-container">
        <div id="slider-arrows">
          <button onClick={() => this._slide(-1)}>
            <i className="slider-arrow fa fa-angle-left"></i>
          </button>
          <button onClick={() => this._slide(1)}>
            <i className="slider-arrow fa fa-angle-right"></i>
          </button>
        </div>

        <div id="slider-wrapper">
          <div id="image-container">
            {currentSlide}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({images: state.images})
export default connect(mapStateToProps)(ImageSlider);