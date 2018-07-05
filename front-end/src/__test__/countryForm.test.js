import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure as configureEnzyme, mount } from 'enzyme';
import CountryForm from '../components/countryForm/countryForm';

configureEnzyme({ adapter: new Adapter() });

describe('#CountryForm', () => {
  test('state should change as value in form changes', () => {
    const testCountry = {
      target: {
        name: 'countryName',
        value: 'venezuela',
      },
    };

    const mountedForm = mount(<CountryForm/>);
    mountedForm.find('.country-form .country-name').simulate('change', testCountry);
    expect(mountedForm.state().countryName).toEqual('venezuela');
  });
});
