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
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '300px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => <GoogleMap
    defaultZoom={7}
    defaultCenter=
    { 
      { 
        lat: Number(props.selected.capitalCoordinates[0].slice(0, props.selected.capitalCoordinates[0].length - 2).replace(' ', '.')),
        lng: Number(props.selected.capitalCoordinates[1].slice(0, props.selected.capitalCoordinates[1].length - 2).replace(' ', '.')),
      }
    }
  >
  {
    props.isMarkerShown && 
    <Marker position=
    {
      { 
        lat: Number(props.selected.capitalCoordinates[0].slice(0, props.selected.capitalCoordinates[0].length - 2).replace(' ', '.')),
        lng: Number(props.selected.capitalCoordinates[1].slice(0, props.selected.capitalCoordinates[1].length - 2).replace(' ', '.')),
      }
    } 
    onClick={props.onMarkerClick} 
    />
  } 
  </GoogleMap>);

class CapitalMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      coordinates: null,
    };
  }

  componentDidMount() {
    this.delayedShowMarker();
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
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
        selected={this.props.selected}
      />
    );
  }
}

CapitalMap.propTypes = {
  selected: PropTypes.object,
};

export default CapitalMap;
