import React from 'react';
import './footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>- All information courtesy of the CIA World Factbook -</p>
        <p>&copy; {new Date().getFullYear()} - Kris</p>
      </footer>
    )
  }
}

export default Footer;
