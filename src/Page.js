import React from 'react';
import Thumbnail from './Thumbnail';
import Modal from './Modal';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      showModal: false,
      modalData: null,
      imagesLoaded: false,
      loadTally: 0
    }
  }

  _handlePageClick = (page) => {
    if(page !== this.state.currentPage) {
      this.setState({
        currentPage: page,
        imagesLoaded: false,
        loadTally: 0
      });
    }
  }

  _showModal = (img) => {
    this.setState({showModal: true, modalData: img})
  }

  _closeModal = () => {
    this.setState({showModal: false, modalData: null})
  }

  _tallyLoaded = () => {
    let images = this.props.pages[this.state.currentPage]
    this.state.loadTally++;
    if(this.state.loadTally >= images.length) {
      this.setState({imagesLoaded: true});
    }
  }

  render() {
    const pages = this.props.pages;

    const pageNumbers = (pages) ? Object.keys(pages).map((page, i) => (
      <button onClick={() => {this._handlePageClick(i + 1)}} key={i}>{page}</button>)
    ) : '';

    let images = this.props.pages[this.state.currentPage];

    let fadeInClass = (this.state.imagesLoaded) ? 'fade-in' : '';
    let wrapperClasses = `thumbnails-container ${fadeInClass}`;
    const thumbnailsMapped = images.map((img, i) => (
      <Thumbnail 
        key={i}
        size="large" 
        image={img}
        onLoad={this._tallyLoaded}
        onClick={(img) => {this._showModal(img)}} />
    ));

    const modal = (this.state.showModal) ? 
    <Modal 
      data={this.state.modalData}
      closeModal={this._closeModal} /> : '';
    return(
      <section className="page-wrapper">
        <div id="pageNumbers-container">
          <p>Page: {pageNumbers}</p>
        </div>
        <div className={wrapperClasses}>
          {thumbnailsMapped}
        </div>
        {modal}
      </section>
    );
  }
}

export default Page;