import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import electionsGet from '../../actions/electionActions';

class Elections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elections: null,
    };
  }

  componentDidMount() {
    this.props.electionsGet()
      .then((response) => {
        this.setState({ elections: response.body });
      });
  }

  render() {
    const { elections } = this.props;
    let futureElectionsJSX = null;

    if (elections) {
      futureElectionsJSX = 
        <ul className="election-tracker">
          {
            elections.map((country) => {
              const className = country.country.includes(' ') ? country.country.replace(' ', '-') : country.country;
              const systemUrl = `https://en.wikipedia.org/wiki/${country.country}`;

              return (
                <li key={ country.id } className={ className }>
                  <div>
                    <p>
                      <a target="_blank" rel="noopener noreferrer" href={ systemUrl }>
                        { country.country }
                      </a>
                    </p>
                    <p>Next executive: { country.electionDates.exec.next }</p>
                    <p>Next legislative: { country.electionDates.leg.next }</p>
                  </div>
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="election-info">
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
