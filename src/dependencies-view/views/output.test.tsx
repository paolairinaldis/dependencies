import React from 'react';

import { shallow } from 'enzyme';

import Output from './output';

// TODO: LOAD TO ENZYME/JEST CONFIG FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Output Test', () => {
    it('should render Output and components', () => {
        const outputContent = ['TEST'];
        const wrapper = shallow(<Output outputContent={outputContent} />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.prop('className')).toEqual('OutputView');
    });
});