import React from 'react';
import Thumbnail from './Thumbnail';
import Modal from './Modal';

let loadTally = 0;
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      showModal: false,
      modalData: null,
      imagesLoaded: false,
    }
  }

  _handlePageClick = (page) => {
    if(page !== this.state.currentPage) { // if its a different page
      // remove active class from current active and add to new page
      const currentActive = document.querySelectorAll('.page-active');
      const newActive = document.querySelectorAll(`.page-btn-${page}`);
      currentActive.forEach((item) => {
        item.classList.remove('page-active');
      });

      newActive.forEach((item) => {
        item.classList.add('page-active');
      }); 

      // set the state page to the passed page parameter
      // reset loaded tally and boolean
      this.setState({
        currentPage: page,
        imagesLoaded: false,
        loadTally: 0
      });
    }
  }

  // opens the modal with the appropriate image passed in
  _showModal = (img) => {
    this.setState({showModal: true, modalData: img})
  }

  _closeModal = () => {
    const modal = document.getElementsByClassName('modal-container')[0];
    // fade out modal and reset state after timeout
    modal.classList.add('fade-out');
    setTimeout(() => {
      this.setState({showModal: false, modalData: null})
    }, 500);
  }

  // this function ensures all images are loaded before they're displayed
  _tallyLoaded = () => {
    // get correct images array from pages prop
    let images = this.props.pages[this.state.currentPage]

    // as the images load the tally is incremented
    loadTally++;
    // once the tally equals the number of images, set boolean to true
    if(loadTally >= images.length) {
      this.setState({imagesLoaded: true});
    }
  }

  render() {
    const pages = this.props.pages;
    console.log(pages)
    const pageNumbers = (pages) ? Object.keys(pages).map((page, i) => {
      // for each page, create a corresponding button
      let btnClass = (i === 0) ? `page-active page-btn-${page}` : `page-btn-${page}`;
      return (
        <button 
          className={btnClass} 
          onClick={() => {this._handlePageClick(i + 1)}} key={i}>{page}</button>
      )}) : '';

    // grab the images array from pages prop, using the current page in state
    let images = this.props.pages[this.state.currentPage];
    
    // add fade in animation once images are loaded
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
        <div id="page-header">
          <h3>Gallery</h3>
        </div>
        <div className="pageNumbers-container">
          <p>{pageNumbers}</p>
        </div>
        <div className={wrapperClasses}>
          {thumbnailsMapped}
        </div>
        {modal}
        <div className="pageNumbers-container">
          <p>{pageNumbers}</p>
        </div>
      </section>
    );
  }
}

export default Page;