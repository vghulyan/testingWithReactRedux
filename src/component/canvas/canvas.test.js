import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from './../../../Utils';
import Canvas from "./index";

describe('Canvas Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {
                title: 'Example Title',
                rate: 12
            };
            const propsError = checkProps(Canvas, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                title: 'Example Title',
                rate: 12
            };
            wrapper = shallow(<Canvas {...props} />);
        });

        it('Should renders without error', () => {
            const component = findByTestAttr(wrapper, 'canvasComponent');
            expect(component.length).toBe(1);
        });

        it('Should render a title', () => {
            const title = findByTestAttr(wrapper, 'componentTitle');
            expect(title.length).toBe(1);
        });

        it('Should render a rate', () => {
            const rate = findByTestAttr(wrapper, 'componentRate');
            expect(rate.length).toBe(1);
        });

    });

    describe('Should NOT render', () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                rate: 12
            };
            wrapper = shallow(<Canvas {...props} />);
        });

        it('Component is not rendered', () => {
           const component = findByTestAttr(wrapper, 'canvasComponent');
           expect(component.length).toBe(0);
        });
    });


})
