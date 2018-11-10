import React from 'react';
import {connect} from 'react-redux';
import Slide from './Slide'

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // find the index of the image prop in redux store  
      currentImageIndex: this.props.images.findIndex((img) => img.id === this.props.image.id),
      slideshowInterval: null
    }
  }

  _handleArrowClick = (n) => {
    // if theres an interval running...
    if(this.state.slideshowInterval) {
      // ... clear it, 
      let currInterval = this.state.slideshowInterval;
      console.log(currInterval)
      clearInterval(currInterval)
      // slide the image,
      this._slide(n);
      // restart it
      let intervalId = setInterval(() => {this._slide(1)}, 4000)
      this.setState({slideshowInterval: intervalId})
    }
    else {
      this._slide(n);
    }
  }

  _toggleSlideshow = () => {
    if(!this.state.slideshowInterval) {
      // slide right away to prevent 4 confusing seconds
      this._slide(1);
      let intervalId = setInterval(() => {this._slide(1)}, 4000)
      this.setState({slideshowInterval: intervalId})
    }
    else {
      clearInterval(this.state.slideshowInterval);
      this.setState({slideshowInterval: null})
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

  _assignKeys = (e) => {
    if(e.key === 'ArrowRight') {
      this._slide(1);
    }
    else if(e.key === 'ArrowLeft') {
      this._slide(-1);
    }
    else if(e.key === 'Escape') {
      this.props.closeModal();
    }
    else if(e.key === ' ') {
      this._toggleSlideshow();
    }
  }

  componentDidMount() {
    // add keydown event for controlling modal and slides
    document.addEventListener('keydown', this._assignKeys)
  }

  componentWillUnmount() {
    if(this.state.slideshowInterval) {
      // clear interval on unmount if one exists
      let intervalId = this.state.slideshowInterval;
      clearInterval(intervalId);
    }
    // remove keydown event
    document.removeEventListener('keydown', this._assignKeys)
  }

  render() {
    const index = this.state.currentImageIndex;
    const imagesArr = this.props.images;
    var imageSourcesArr = [];
    const slidesMapped = imagesArr.map((img, i) => {
      let sourceArr = img.post_url.split('/');
      let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`;
      imageSourcesArr.push(url);

      // create a slide for each image in redux store
      return <Slide image={img} key={i} />
    });

    // display the slide at the found index
    const currentSlide = [slidesMapped[index]];
    const currentFullScreenSrc = imageSourcesArr[index]
    console.log(currentFullScreenSrc)

    // toggle slideshow icon on state change
    let slideshowIcon = (this.state.slideshowInterval) ? 
    <i key="pause" className="fa fa-pause pop-in"></i> : <i key="play" className="fa fa-play-circle pop-in"></i>
    
    let slideTotal = slidesMapped.length;
    let currentSlideNumber = <span className="pop-in" key={index + 1}>{index + 1}</span>

    return (
      <div id="slider-container">
        <div id="slideshow-controls">
          <button onClick={this._toggleSlideshow}>
            {slideshowIcon}
          </button>
        </div>

        <div id="slider-arrows">
          <button onClick={() => {this._handleArrowClick(-1)}}>
            <i className="slider-arrow fa fa-angle-left"></i>
          </button>
          <button onClick={() => {this._handleArrowClick(1)}}>
            <i className="slider-arrow fa fa-angle-right"></i>
          </button>
        </div>

        <div id="slider-wrapper">
          <div id="image-container">
            {currentSlide}
          </div>
        </div>
        <div id="slide-number-container">
          <p>{currentSlideNumber} of {slideTotal}</p>
        </div>
        <a href={currentFullScreenSrc} rel="noopener noreferrer" target="_blank" id="expand-btn">
          <i className="fa fa-expand-arrows-alt"></i>
        </a>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({images: state.images})
export default connect(mapStateToProps)(ImageSlider);