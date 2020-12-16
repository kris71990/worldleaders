import React from 'react';
import PropTypes from 'prop-types';

import './country-economy.scss';

class CountryEconomy extends React.Component {
  render() {
    const { selected, existingCount } = this.props;

    let resourcesJSX = null;
    let importsJSX = null;
    let importPartnersJSX = null;
    let exportsJSX = null;
    let exportPartnersJSX = null;

    if (selected) {
      resourcesJSX = 
        <div className="resources">
          <h4>Natural Resources</h4>
          <ul>
          {
            selected.naturalResources ?
              selected.naturalResources.map((x) => {
                return (
                  <li key={x}>{x}</li>
                );
              })
              : null
          }
          </ul>
        </div>;

      importsJSX = 
        <div className="import-goods">
          <h4>Imports</h4>
          <ul>
          {
            selected.imports ?
              selected.imports.map((x, i) => {
                return (
                  <li key={i}>{x}</li>
                );
              })
              : null
          }
          </ul>
        </div>;

      importPartnersJSX = 
        <div className="import-partners">
          <h4>Importing from:</h4>
          <ul>
          {
            selected.importPartners ?
              selected.importPartners.map((x, i) => {
                return (
                  <li key={i}>{`${x.name} - ${x.percent}%`}</li>
                );
              })
              : null
          }
          </ul>
        </div>;

      exportsJSX = 
        <div className="export-goods">
          <h4>Exports</h4>
          <ul>
          {
            selected.exports ?
              selected.exports.map((x, i) => {
                return (
                  <li key={i}>{x}</li>
                );
              })
              : null
          }
          </ul>
        </div>;

      exportPartnersJSX = 
        <div className="export-partners">
          <h4>Exporting to:</h4>
          <ul>
          {
            selected.exportPartners ?
              selected.exportPartners.map((x, i) => {
                return (
                  <li key={i}>{`${x.name} - ${x.percent}%`}</li>
                );
              })
              : null
          }
          </ul>
        </div>;
    }

    return (
      <div className="economy">
        <h3>Economy: { selected.gdpPPPRank } / { existingCount }</h3>
        <p>
          <a href="https://en.wikipedia.org/wiki/Purchasing_power_parity" target="_blank" rel="noopener noreferrer">(Purchasing Power Parity)</a>
        </p>
        { resourcesJSX }
        <div className="exports">
          { exportsJSX }
          { exportPartnersJSX }
        </div>
        <div className="imports">
          { importsJSX }
          { importPartnersJSX }
        </div>
      </div>
    );
  }
}

CountryEconomy.propTypes = {
  selected: PropTypes.object,
  existingCount: PropTypes.number,
};

export default CountryEconomy;
