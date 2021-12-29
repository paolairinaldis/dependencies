import React from 'react';

import { shallow } from 'enzyme';

import Input from './input';

// TODO: LOAD TO ENZYME/JEST CONFIG FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Input Test', () => {
    it('should render Input and components', () => {
        const inputContent = ['TEST'];
        const wrapper = shallow(<Input inputContent={inputContent} />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.prop('className')).toEqual('InputView');
    });
});