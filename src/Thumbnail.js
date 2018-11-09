import React from 'react';

class Thumbnail extends React.Component {
  render() {
    let image = this.props.image;
    let sourceArr = image.post_url.split('/');
    let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`
    return(
      <a onClick={() => this.props.onClick(image)} className="thumbnail-wrapper">
        <img style={styles.img} src={url} />
      </a>
    )
  }
}

const styles = {
  img: {
    width: '100%'
  }
}

export default Thumbnail;