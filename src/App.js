import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setImages} from './actions';
import Nav from './Nav';
import {Footer} from './Footer';
import Page from './Page';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: null,
    }
  }

  _createPages = (images) => {
    let pages = {1: []}; // declare object with at least one page
    let page = 1;
    images.forEach((img, i) => {
      // for every 9 images, increment page number and create a new page 
      if(i % 9 === 0 && i > 0) {
        page++;
        pages[page] = [];
      }
      // push current img into pages object at appropriate page key
      pages[page].push(img)
    });
    this.setState({pages}) // set pages in state to be passed to page component
  }

  componentDidMount() {
    const url = 'https://picsum.photos/list';

    // request photos from picsum on component mount
    axios.get(url).then((results) => {
      let images = [];
      results.data.forEach((img) => {
        // filter results by author
        if(img.author === 'Alejandro Escamilla') {
          images.push(img)
        }
      });
      this._createPages(images); // pass filtered images to create pages function
      this.props.setImages(images); // update images in redux store
    });
  }

  render() {
    const pages = this.state.pages;
    if(pages) {
      return (
        <div className="App">
          <Nav />
          <main>
            <Page pages={pages} />
          </main>
          <Footer />
        </div>
      );
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({images: state.images});
const mapActionsToProps = {setImages};

export default connect(mapStateToProps, mapActionsToProps)(App);
