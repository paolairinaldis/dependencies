import React from 'react';

import { shallow } from 'enzyme';

import DependenciesView from './views/output';

import DependenciesContainer from './dependencies.container';

// TODO: LOAD TO ENZYME/JEST CONFIG FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('DependenciesContainer Test', () => {
    it('should render DependenciesContainer and components', () => {
        const wrapper = shallow(<DependenciesContainer />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find(DependenciesView)).toHaveLength(1);
    });
});