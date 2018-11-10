import React from 'react';

class Nav extends React.Component {

  render() {
    return (
      <header id="app-header">
        <div className="animate-height"  id="header-wrapper">
          <a target="_blank" rel="noopener noreferrer" id="author-link" href="https://unsplash.com/@alejandroescamilla">
            <i className="fa fa-camera"></i>
          </a>
          <div style={styles.logoWrapper} id="logo-wrapper">
            <h1>Alejandro Escamilla</h1>
            <p>Photography</p>
          </div>
        </div>
      </header>
    );
  }
}

const styles = {
  logoWrapper: {
    textAlign: 'center'
  }
}

export default Nav;