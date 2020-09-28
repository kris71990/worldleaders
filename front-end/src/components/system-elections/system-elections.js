import React from 'react';
import PropTypes from 'prop-types';

import './system-elections.scss';

class SystemElections extends React.Component {
  render() {
    const { selected } = this.props;

    let electionsExecJSX = null;
    let electionsLegJSX = null;
    let electionResultsExecJSX = null;
    let electionResultsLegJSX = null;

    if (selected) {
      if (selected.electionsExec) {
        let arr;
        if (selected.electionsExec.includes(';')) {
          arr = selected.electionsExec.split(';');
        } else {
          arr = [selected.electionsExec];
        }
  
        electionsExecJSX = 
          <ul>
            {
              arr.map((x, i) => {
                return (
                  <li key={i}>{x}</li>
                );
              })
            }
          </ul>;
      }
  
      if (selected.electionResultsExec) {
        let arr;
        if (selected.electionResultsExec.includes(';')) {
          arr = selected.electionResultsExec.split(';');
        } else {
          arr = [selected.electionResultsExec];
        }
  
        electionResultsExecJSX = 
          <ul>
            {
              arr.map((x, i) => {
                return (
                  <li key={i}>{ x }</li>
                );
              })
            }
          </ul>;
      }
  
      if (selected.electionsLeg) {
        let arr;
        if (selected.electionsLeg.includes(';')) {
          arr = selected.electionsLeg.split(';');
        } else {
          arr = [selected.electionsLeg];
        }
  
        electionsLegJSX = 
          <ul>
            {
              arr.map((x, i) => {
                return (
                  <li key={i}>{ x }</li>
                );
              })
            }
          </ul>;
      }
  
      if (selected.electionResultsLeg) {
        let arr;
        if (selected.electionResultsLeg.includes(';')) {
          arr = selected.electionResultsLeg.split(';');
        } else {
          arr = [selected.electionResultsLeg];
        }
  
        electionResultsLegJSX = 
          <ul>
            {
              arr.map((x, i) => {
                return (
                  <li key={i}>{ x }</li>
                );
              })
            }
          </ul>;
      }
    }

    return (
      <div className="system-election-info">
        <h4>Electoral Information</h4>
        <div id="executive">
          <h3>Executive</h3>
          { electionsExecJSX }
          <h5>Most recent results</h5>
          { electionResultsExecJSX ? electionResultsExecJSX : <p>No election data</p> }
        </div>
        <div id="legislative">
          <h3>Legislative</h3>
          { electionsLegJSX }
          <h5>Most recent results</h5>
          { electionResultsLegJSX ? electionResultsLegJSX : <p>No election data</p> }
        </div>
      </div>
    );
  }
}

SystemElections.propTypes = {
  selected: PropTypes.object,
};

export default SystemElections;
