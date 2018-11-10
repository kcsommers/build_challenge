import React from 'react';

const Slide = (props) => {
  let image = props.image;
  let sourceArr = image.post_url.split('/');
  let url = `http://source.unsplash.com/${sourceArr[sourceArr.length - 1]}`;
  return (
    <div className="slider-image slide-in">
      <img 
        src={url} 
        alt={props.image.post_url} />
    </div>
  );
}
export default Slide;