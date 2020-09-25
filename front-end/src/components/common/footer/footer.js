import React from 'react';
import './footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>Data from CIA World Factbook</p>
        <p><span>&copy;</span> { new Date().getFullYear() }</p>
      </footer>
    );
  }
}

export default Footer;
