/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { BooleanFilterEditor } from '../src/filterControls/BooleanFilterEditor';
import { render, fireEvent, getAllByRole } from '@testing-library/react';
import { mockColumn } from './mock';

initializeIcons();

describe('BooleanFilterEditor', () => {
    it('should render BooleanFilterEditor initial state w/o problem', async () => {
        const emptyFn = jest.fn();
        const { container } = render(
            <BooleanFilterEditor column={{ ...mockColumn, filterText: undefined }} onApply={emptyFn} />,
        );

        const firstRadioButton = getAllByRole(container as HTMLElement, 'radio')[0];

        expect(firstRadioButton).toBeDefined();
    });

    it('should render BooleanFilterEditor initial state w/o problem and click the firstRadioButton', async () => {
        const emptyFn = jest.fn();
        const { container } = render(<BooleanFilterEditor column={{ ...mockColumn }} onApply={emptyFn} />);

        const firstRadioBuutton = getAllByRole(container as HTMLElement, 'radio')[0];

        expect(fireEvent.click(firstRadioBuutton)).toBeTruthy();
    });

    it('Key value should be all', async () => {
        const emptyFn = jest.fn();
        const { container } = render(<BooleanFilterEditor column={{ ...mockColumn, name: 'all' }} onApply={emptyFn} />);

        const allRadios = getAllByRole(container as HTMLElement, 'radio');
        const lastRadioBuutton = allRadios[allRadios.length - 1];

        expect(fireEvent.click(lastRadioBuutton)).toBeTruthy();
    });
});
