import React from 'react';
import renderer from 'react-test-renderer';
import { LoadingDots } from '../../../client/components';

describe('Test Loading Dots behaviour', () => {
    function asserts(numberOfDots) {
        const component = renderer.create(
            <LoadingDots numberOfDots={ numberOfDots } />,
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(tree.children.length).toBe(numberOfDots);

        tree.children.forEach((child) => {
            expect(child.type).toBe('div');
            expect(child.props.className).toBe('circle');
            expect(child.children).toBeNull();
        });
    }

    it(`Scenario:
            Should render dots accordandly with the number of dots provided`, () => {
        asserts(3);
        asserts(6);
        asserts(8);
        asserts(10);
    });
});
