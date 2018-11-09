import React from 'react';
import {connect} from 'react-redux';

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: this.props.images.findIndex((img) => img.id === this.props.image.id)
    }
  }

  render() {
    let index = this.state.currentImageIndex;
    let imagesArr = this.props.images;
    let currentImage = imagesArr[index];
    let sourceArr = currentImage.post_url.split('/');
    let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`
    

    return (
      <div style={styles.container} id="slider-container">
        <div style={styles.wrapper} id="slider-wrapper">
          <div style={styles.imgContainer} id="image-container">
            <img style={styles.img} src={url} />
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    height: '100vh'
  },
  wrapper: {
    maxWidth: '60%',
    backgroundColor: 'green'
  },
  imgContainer: {
    
  },
  img: {
    maxHeight: '80vh',
    maxWidth: '100%'
  }
}

const mapStateToProps = (state) => ({images: state.images})
export default connect(mapStateToProps)(ImageSlider);