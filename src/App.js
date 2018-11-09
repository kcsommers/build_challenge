import React, { Component } from 'react';
import Page from './Page';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: null,
      currentPage: 1
    }
  }

  _handlePageClick = (page) => {
    this.setState({currentPage: page})
  }

  _createPages = (images) => {
    let pages = {1: []};
    let page = 1;
    images.forEach((img, i) => {
      if(i % 25 === 0 && i > 0) {
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
        if(img.author = 'Alejandro Escamilla') {
          images.push(img)
        }
      });
      this._createPages(images)
    });
  }

  render() {
    const pages = this.state.pages;
    const pageNumbers = (pages) ? Object.keys(pages).map((page, i) => (
      <button onClick={() => {this._handlePageClick(i + 1)}} key={i}>{page}</button>)
    ) : '';

    return (
      <div className="App">
        <header className="App-header">

        </header>
        <main>
          <section id="page-navigation">
            <div id="pageNumbers-container">
              {pageNumbers}
            </div>
          </section>
          <section id="page-section">
            <Page images={(pages) ? pages[this.state.currentPage] : []} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
