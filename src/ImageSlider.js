import React from 'react';
import {connect} from 'react-redux';

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: this.props.images.findIndex((img) => img.id === this.props.image.id),
    }
  }

  _slide = (n) => {
    this.setState({currentClass: 'slider-image slide-out'})
    let index = this.state.currentImageIndex;
    let imagesArr = this.props.images;
    let length = imagesArr.length
    if(index === 0 && n === -1) index = length - 1;
    else if(index === length - 1 && n === 1) index = 0;
    else index += n;
    this.setState({currentImageIndex: index});
  }

  render() {
    let index = this.state.currentImageIndex;
    let imagesArr = this.props.images;

    let imagesMapped = imagesArr.map((img, i) => {
      let sourceArr = img.post_url.split('/');
      let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`;
      return <img src={url} key={i} className="slider-image slide-in" />
    });

    let displayedImages = [imagesMapped[index]];

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
            {displayedImages}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({images: state.images})
export default connect(mapStateToProps)(ImageSlider);