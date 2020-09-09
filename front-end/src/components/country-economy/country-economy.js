import React from 'react';
import PropTypes from 'prop-types';

import './country-economy.scss';

class CountryEconomy extends React.Component {
  render() {
    const { selected } = this.props;

    let resourcesJSX = null;
    let importsJSX = null;
    let importPartnersJSX = null;
    let exportsJSX = null;
    let exportPartnersJSX = null;

    if (selected) {
      resourcesJSX = 
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
        </ul>;

      importsJSX = 
        <ul>
          {
            selected.imports ?
              selected.imports.map((x) => {
                return (
                  <li key={x}>{x}</li>
                );
              })
              : null
          }
        </ul>;

      exportsJSX = 
        <ul>
          {
            selected.exports ?
              selected.exports.map((x) => {
                return (
                  <li key={x}>{x}</li>
                );
              })
              : null
          }
        </ul>;

      importPartnersJSX = 
        <ul>
          {
            selected.importPartners ?
              selected.importPartners.map((x) => {
                return (
                  <li key={x.name}>{`${x.name} - ${x.percent}%`}</li>
                );
              })
              : null
          }
        </ul>;

      exportPartnersJSX = 
        <ul>
          {
            selected.exportPartners ?
              selected.exportPartners.map((x) => {
                return (
                  <li key={x.name}>{`${x.name} - ${x.percent}%`}</li>
                );
              })
              : null
          }
        </ul>;
    }

    return (
      <div className="economy">
        <h2>GDP PPP Rank: { selected.gdpPPPRank }</h2>
        <div className="resources">
          <p>Natural Resources</p>
          {resourcesJSX}
        </div>
        <div className="exports">
          <div className="export-goods">
            <p>Exports</p>
            {exportsJSX}
          </div>
          <div className="export-partners">
            <p>Exporting to:</p>
            {exportPartnersJSX}
          </div>
        </div>
        <div className="imports">
          <div className="import-goods">
            <p>Imports</p>
            {importsJSX}
          </div>
          <div className="import-partners">
            <p>Importing from:</p>
            {importPartnersJSX}
          </div>
        </div>
      </div>
    );
  }
}

CountryEconomy.propTypes = {
  selected: PropTypes.object,
};

export default CountryEconomy;
