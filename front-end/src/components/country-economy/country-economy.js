import React from 'react';
import PropTypes from 'prop-types';

import './country-economy.scss';

class CountryEconomy extends React.Component {
  constructor(props) {
    super(props);
  }

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
              )
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
              )
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
              )
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
              )
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
              )
            })
            : null
          }
        </ul>;
    }

    return (
      <div className="economy">
        <h3>Economy</h3>
        <p>GDP PPP Rank: {selected.gdpPPPRank}</p>
        <div className="resources">
          <h5>Natural Resources</h5>
          {resourcesJSX}
        </div>
        <div className="exports">
          <div className="export-goods">
            <h5>Exports</h5>
            {exportsJSX}
          </div>
          <div className="export-partners">
            <h5>Exporting to:</h5>
            {exportPartnersJSX}
          </div>
        </div>
        <div className="imports">
          <div className="import-goods">
            <h5>Imports</h5>
            {importsJSX}
          </div>
          <div className="import-partners">
            <h5>Importing from:</h5>
            {importPartnersJSX}
          </div>
        </div>
      </div>
    );
  }
}

CountryEconomy.propTypes = {
  selected: PropTypes.object,
}

export default CountryEconomy;