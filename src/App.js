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
    let pages = {1: []};
    let page = 1;
    images.forEach((img, i) => {
      if(i % 9 === 0 && i > 0) {
        page++;
        pages[page] = [];
      }
      pages[page].push(img)
    });
    this.setState({pages})
  }

  componentDidMount() {
    const url = 'https://picsum.photos/list';
    axios.get(url).then((results) => {
      let images = [];
      results.data.forEach((img) => {
        if(img.author === 'Alejandro Escamilla') {
          images.push(img)
        }
      });
      this._createPages(images);
      this.props.setImages(images);
    });
  }

  render() {
    const pages = this.state.pages;
    if(pages) {
      return (
        <div className="App">
          <Nav />
          <main>
            <section id="page-section">
              <Page 
                pages={pages} />
            </section>
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
