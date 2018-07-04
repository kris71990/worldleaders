import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { configure as configureEnzyme, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import Landing from '../components/landing/landing';
import reporter from '../lib/redux-reporter';
import session from '../lib/redux-session';
import thunk from '../lib/redux-thunk';

configureEnzyme({ adapter: new Adapter() });

describe('Testing of Landing Component (homepage)', () => {
  const testState = {
    countries: [
      {
        countryName: 'Benin',
        id: '12345',
      },
      {
        countryName: 'Togo',
        id: '67890',
      },
    ],
  };

  test('testing landing and store', () => {
    const middleare = [thunk, reporter, session];
    const mockStore = configureStore(middleare);
    const mountedLanding = mount(<Provider store={mockStore(testState)}><Landing/></Provider>);

    expect(mountedLanding).find('h2').toBeTruthy();
    expect(mountedLanding).find('CountryForm').toBeTruthy();
  });
});
