import React from 'react';
import { compose, withProps } from 'recompose';
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker, 
} from 'react-google-maps';
import PropTypes from 'prop-types';

import './capital-map.scss';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`,
    loadingElement: <div style={{ height: '80%' }} />,
    containerElement: <div style={{ height: '300px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
  {
    props.isMarkerShown && 
    <Marker position={{ lat: -34.397, lng: 150.644 }} 
    onClick={props.onMarkerClick} 
    />
  }
  </GoogleMap>,
);

class CapitalMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

CapitalMap.propTypes = {
  selected: PropTypes.object,
};

export default CapitalMap;
