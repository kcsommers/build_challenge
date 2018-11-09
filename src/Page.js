import React from 'react';
import Thumbnail from './Thumbnail';
import Modal from './Modal';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalData: null
    }
  }

  _showModal = (img) => {
    this.setState({showModal: true, modalData: img})
  }

  render() {
    let images = this.props.images;
    const thumbnailsMapped = images.map((img, i) => (
      <Thumbnail 
        key={i}
        size="large" 
        image={img}
        onClick={(img) => {this._showModal(img)}} />
    ));
    return(
      <section className="page-wrapper">
        <div className="thumbnails-container">
          {thumbnailsMapped}
        </div>
        <Modal isVisible={this.state.showModal} />
      </section>
    );
  }
}

export default Page;