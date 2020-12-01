import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { TextCell } from '../src/cells/index';
import { render, getByText } from '@testing-library/react';
import { InnerTextCell } from '../src/cells/TextCell';

initializeIcons();

describe('TextCell', () => {
    it('should render TextCell initial state w/o problem and show Lorem ipsum', async () => {
        const value = 'Lorem ipsum';
        const { container } = render(<TextCell value={value} textAlign='Center' />);
        const htmlElement = getByText(container as HTMLElement, value);
        expect(htmlElement).toBeTruthy();
    });

    it('should render TextCell initial state w/o problem and show Lorem ipsum with textAlign:Left', async () => {
        const value = 'Lorem ipsum';
        const { container } = render(<TextCell value={value} />);
        const htmlElement = getByText(container as HTMLElement, value);
        expect(htmlElement).toBeTruthy();
    });

    it('should render TextCell initial state w/o problem and show 123 with TooltipHost', async () => {
        const value = '123';
        const { container } = render(<TextCell value={value} textAlign='Right' />);
        const htmlElement = getByText(container as HTMLElement, value);
        expect(htmlElement).toBeTruthy();
    });
});

describe('InnerTextCell', () => {
    it('should render InnerTextCell initial state w/o problem and show Lorem ipsum', async () => {
        const value = 'Lorem ipsum';
        const { container } = render(<InnerTextCell value={value} textAlign='Right' />);
        const htmlElement = getByText(container as HTMLElement, value);
        expect(htmlElement).toBeTruthy();
    });

    it('should render InnerTextCell initial state w/o problem and show Lorem ipsum with textAlign:Left', async () => {
        const value = 'Lorem ipsum';
        const { container } = render(<InnerTextCell value={value} />);
        const htmlElement = getByText(container as HTMLElement, value);
        expect(htmlElement).toBeTruthy();
    });
});