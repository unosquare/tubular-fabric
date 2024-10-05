/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { ToggleColumns } from '../src/ToggleColumns';
import { render, getAllByRole, fireEvent } from '@testing-library/react';
import { mockColumn } from './mock';

initializeIcons();

describe('ToggleColumns', () => {
    it('should render ToggleColumns initial state w/o problem', async () => {
        const { container } = render(<ToggleColumns columns={[mockColumn]} setColumns={jest.fn()} />);

        expect(getAllByRole(container, 'checkbox').length > 0).toBeTruthy();
    });

    it('Should click to the first checkbox and call handleChange with visible=true', async () => {
        const { container } = render(<ToggleColumns columns={[mockColumn]} setColumns={jest.fn()} />);

        const checkbox = getAllByRole(container, 'checkbox')[0];

        expect(fireEvent.click(checkbox)).toBeTruthy();
    });

    it('Should click to the first checkbox and call handleChange with more than 1 column', async () => {
        const { container } = render(
            <ToggleColumns
                columns={[
                    { ...mockColumn, visible: false },
                    { ...mockColumn, name: 'Test1', visible: false },
                ]}
                setColumns={jest.fn()}
            />,
        );

        const checkbox = getAllByRole(container, 'checkbox')[1];

        expect(fireEvent.click(checkbox)).toBeTruthy();
    });
});
