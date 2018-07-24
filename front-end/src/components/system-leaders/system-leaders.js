import React from 'react';
import PropTypes from 'prop-types';

class SystemLeaders extends React.Component {
  render() {
    const { selected } = this.props;

    let hosJSX = null;
    let hogJSX = null;

    if (selected) {
      if (selected.headOfGovernmentFull) {
        let arr;
        if (selected.headOfGovernmentFull.includes(';')) {
          arr = selected.headOfGovernmentFull.split(';');
        } else {
          arr = [selected.headOfGovernmentFull];
        }
  
        hogJSX = 
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
  
      if (selected.chiefOfStateFull) {
        let arr;
        if (selected.chiefOfStateFull.includes(';')) {
          arr = selected.chiefOfStateFull.split(';');
        } else {
          arr = [selected.chiefOfStateFull];
        }
  
        hosJSX = 
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
    }
    
    return (
      <div className="system-election-info">
        <h4>Head of State:</h4>
        {hosJSX}
        <h4>Head of Government:</h4>
        {hogJSX}
      </div>
    );
  }
}

SystemLeaders.propTypes = {
  selected: PropTypes.object,
};

export default SystemLeaders;
