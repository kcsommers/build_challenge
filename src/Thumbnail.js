import React from 'react';

const Thumbnail = (props) => {
  let image = props.image;
  let sourceArr = image.post_url.split('/');
  let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`
  return (
    <div className="thumbnail-wrapper">
      <button onClick={() => props.onClick(image)} >
        <img 
          className="thumbnail-img" 
          alt={image.post_url}
          src={url}
          onLoad={props.onLoad} />
      </button>
    </div>
  )
}

export default Thumbnail;