import React from 'react';

class Slide extends React.Component {
  render() {
    let image = this.props.image;
    let sourceArr = image.post_url.split('/');
    let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`;
    return (
      <div className="slider-image slide-in">
        <img 
          src={url} 
          alt={this.props.image.post_url} />
      </div>
      
    );
  }
}

export default Slide;