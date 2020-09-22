import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import electionsGet from '../../actions/electionActions';
import * as parser from '../../utils/parser';
import autoBind from '../../utils/autoBind';

import './elections.scss';

class Elections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elections: null,
      type: 'executive',
    };
    autoBind.call(this, Elections);
  }

  componentDidMount() {
    this.props.electionsGet()
      .then((response) => {
        this.setState({ elections: response.body });
      });
  }

  handleToggleElectionType(e) {
    if (e.target.textContent === 'Legislative') {
      return this.setState({ type: 'legislative' });
    }
    return this.setState({ type: 'executive' });
  }

  handleComputeUnknownClass(dates) {
    if (this.state.type === 'legislative' && dates.leg.next === 'unknown') return 'unknown';
    if (this.state.type === 'executive' && dates.exec.next === 'unknown') return 'unknown';
    return null;
  }

  render() {
    const { elections } = this.props;
    let futureElectionsJSX = null;

    if (elections) {
      let sortedElections;
      if (this.state.type === 'legislative') {
        sortedElections = parser.sortElectionDates(elections, 'leg');
      } else {
        sortedElections = parser.sortElectionDates(elections, 'exec');
      }

      futureElectionsJSX = 
        <table className="election-tracker">
          <tbody>
          {
            sortedElections.map((country) => {
              const parsedCountry = parser.parseCountryName(country.country);
              const className = country.country.includes(' ') ? country.country.replace(' ', '-') : country.country;
              const systemUrl = `https://en.wikipedia.org/wiki/${country.country}`;

              return (
                <tr key={ country.id } className={ className }>
                  <td className={`country ${this.handleComputeUnknownClass(country.electionDates)}`}>
                    <a target="_blank" rel="noopener noreferrer" href={ systemUrl }>
                      { parsedCountry }
                    </a>
                  </td>
                  <td className={`dates ${this.handleComputeUnknownClass(country.electionDates)}`}>
                    { this.state.type === 'legislative' ?
                      parser.parseElectionDates(country.electionDates.leg.next)
                      : parser.parseElectionDates(country.electionDates.exec.next)
                    }
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>;
    }

    return (
      <div className="election-info">
        <h3>Upcoming Elections Tracker</h3>
        <div className="toggle-buttons">
          <button 
            onClick={ this.handleToggleElectionType }
            className={ this.state.type === 'executive' ? 'selected' : null }
          >Executive</button>
          <button 
            onClick={ this.handleToggleElectionType }
            className={ this.state.type === 'legislative' ? 'selected' : null }
          >Legislative</button>
        </div>
        { futureElectionsJSX }
      </div>
    );
  }
}

Elections.propTypes = {
  history: PropTypes.object,
  elections: PropTypes.array,
  electionsGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    elections: state.elections,
  };
};

const mapDispatchToProps = dispatch => ({
  electionsGet: () => dispatch(electionsGet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Elections);
