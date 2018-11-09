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
    console.log('PAGE', img)
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
    const modal = (this.state.showModal) ? 
    <Modal 
      data={this.state.modalData}
      isVisible={this.state.showModal} /> : '';
    return(
      <section className="page-wrapper">
        <div className="thumbnails-container">
          {thumbnailsMapped}
        </div>
        {modal}
      </section>
    );
  }
}

export default Page;