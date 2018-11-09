import React from 'react';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let image = this.props.image;
    let sourceArr = image.post_url.split('/');
    let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`
    return(
      <a onClick={() => this.props.onClick()} className="thumbnail-wrapper">
        <img src={url} />
      </a>
    )
  }
}

export default Thumbnail;