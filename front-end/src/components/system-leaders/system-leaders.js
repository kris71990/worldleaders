import React from 'react';
import PropTypes from 'prop-types';
import LeaderPhotoForm from '../leaderForm/leader-form';

import './system-leaders.scss';

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
          <div>
            {
              selected.headOfGovernmentImg 
                ? 
              <div>
                <img src={selected.headOfGovernmentImg}></img>
                <ul>
                  {
                    arr.map((x, i) => {
                      return (
                        <li key={i}>{x}</li>
                      );
                    })
                  }
                </ul>
              </div>
                : 
              <div>
                <ul>
                  {
                    arr.map((x, i) => {
                      return (
                        <li key={i}>{x}</li>
                      );
                    })
                  }
                </ul>
                <LeaderPhotoForm system={selected} type={'hog'} keywords={selected.headOfGovernmentKeywords}/>
              </div>
            }
          </div>;
      }
  
      if (selected.chiefOfStateFull) {
        let arr;
        if (selected.chiefOfStateFull.includes(';')) {
          arr = selected.chiefOfStateFull.split(';');
        } else {
          arr = [selected.chiefOfStateFull];
        }
  
        hosJSX = 
          <div>
            {
              selected.chiefOfStateImg 
                ? 
              <div>
                <img src={selected.chiefOfStateImg}></img>
                <ul>
                {
                  arr.map((x, i) => {
                    return (
                      <li key={i}>{x}</li>
                    );
                  })
                }
                </ul>
              </div>
                : 
              <div>
                <ul>
                {
                  arr.map((x, i) => {
                    return (
                      <li key={i}>{x}</li>
                    );
                  })
                }
                </ul>
                <LeaderPhotoForm system={selected} type={'hos'} keywords={selected.chiefOfStateKeywords}/>
              </div>
            }
          </div>;
      }
    }
    
    return (
      <div className="system-leader-info">
        <div className="hos">
          <h4>Head of State:</h4>
          {hosJSX}
        </div>
        <div className="hog">
          <h4>Head of Government:</h4>
          {hogJSX}
        </div>
      </div>
    );
  }
}

SystemLeaders.propTypes = {
  selected: PropTypes.object,
};

export default SystemLeaders;
