import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import App from './App';

describe('Home Page test', () => {
    it('should render without throwing an error', function() {
        expect(shallow(<App />).contains(<span className="hello">Hello World!</span>)).toBe(true);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<App />).find('.test').length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
