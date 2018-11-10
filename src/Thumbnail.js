import React from 'react';

class Thumbnail extends React.Component {
  render() {
    let image = this.props.image;
    let sourceArr = image.post_url.split('/');
    let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`
    return(
      <a onClick={() => this.props.onClick(image)} className="thumbnail-wrapper">
        <img 
          className="thumbnail-img" 
          src={url}
          onLoad={this.props.onLoad} />
      </a>
    )
  }
}

export default Thumbnail;