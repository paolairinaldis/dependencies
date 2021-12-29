import React from 'react';

import { shallow } from 'enzyme';

import Input from './views/input';
import Output from './views/output';

import DependenciesView from './dependencies.view';

// TODO: LOAD TO ENZYME/JEST CONFIG FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('DependenciesView Test', () => {
    it('should render DependenciesView and components', () => {
        const wrapper = shallow(<DependenciesView />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(Output)).toHaveLength(1);
    });
});