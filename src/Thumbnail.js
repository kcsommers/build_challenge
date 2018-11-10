import React from 'react';

class Thumbnail extends React.Component {
  render() {
    let image = this.props.image;
    let sourceArr = image.post_url.split('/');
    let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`
    return(
      <div className="thumbnail-wrapper">
        <button onClick={() => this.props.onClick(image)} >
          <img 
            className="thumbnail-img" 
            alt={image.post_url}
            src={url}
            onLoad={this.props.onLoad} />
        </button>
      </div>
    )
  }
}

export default Thumbnail;