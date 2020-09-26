import React from 'react';
import PropTypes from 'prop-types';

import './country-culture.scss';

class CountryCulture extends React.Component {
  render() {
    const { selected } = this.props;

    let languagesJSX = null;
    let ethnicitiesJSX = null;
    let religionsJSX = null;

    if (selected) {
      languagesJSX = 
        <div>
          <h5>Languages</h5>
          <ul className="ranks">
            {
              selected.languages ?
                selected.languages.map((x) => {
                  let note = null;
                  let percent = null;
                  if (x.note) note = x.note;
                  if (x.percent) percent = x.percent;
                  return (
                  <li key={x.name}>
                    {
                      `${x.name}${percent || note ? `${percent ? ` - ${percent}%` : ''}${note ? ` - ${note}` : ''}` : ''}`
                    }
                  </li>
                  );
                })
                : null
            }
          </ul>
        </div>;

      ethnicitiesJSX = 
        <div>
          <h5>Ethnic Groups</h5>
          <ul className="ranks">
            {
              selected.ethnicities ?
                selected.ethnicities.map((x) => {
                  return (
                  <li key={x.name}>{`${x.name} - ${x.percent}%`}</li>
                  );
                })
                : null
            }
          </ul>
        </div>;

      religionsJSX = 
        <div>
          <h5>Religions</h5>
          <ul className="ranks">
            {
              selected.religions ?
                selected.religions.map((x) => {
                  let breakdown = null;
                  if (x.breakdown) {
                    breakdown = x.breakdown.map((y) => {
                      return ` ${y.name} - ${y.percent}% `;
                    });
                  }
                  return (
                  <li key={x.name}>{`${x.name} - ${x.percent}%`}
                    <span>{ breakdown }</span>
                  </li>
                  );
                })
                : null
            }
          </ul>
        </div>;
    }

    return (
      <div className="culture">
        { languagesJSX }
        { ethnicitiesJSX }
        { religionsJSX }
      </div>
    );
  }
}

CountryCulture.propTypes = {
  selected: PropTypes.object,
};

export default CountryCulture;
