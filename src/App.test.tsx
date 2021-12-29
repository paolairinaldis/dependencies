import React from 'react';

import { shallow } from 'enzyme';

import App from './App';

import DependenciesContainer from './dependencies-view/dependencies.container';

// TODO: LOAD TO ENZYME/JEST CONFIG FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('DependenciesContainer Test', () => {
    it('should render DependenciesContainer and components', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find(DependenciesContainer)).toHaveLength(1);
    });
});
