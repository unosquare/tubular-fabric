/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { DateFilter } from '../src/filterControls/DateFilter';
import { render, getAllByRole, getByRole, fireEvent } from '@testing-library/react';
import { mockColumn } from './mock';
import { CompareOperators } from 'tubular-common';

initializeIcons();

describe('DateFilter', () => {
    it('should render DateFilter initial state w/o problem', async () => {
        const { container } = render(<DateFilter column={{ ...mockColumn }} onApply={jest.fn()} />);
        expect(getByRole(container, 'button')).toBeDefined();
    });

    it('should render DateFilter initial state w/o problem with filter operator: Between', async () => {
        const { container } = render(
            <DateFilter
                column={{ ...mockColumn, filterOperator: CompareOperators.Between, filterArgument: ['x', 'x'] }}
                onApply={jest.fn()}
            />,
        );
        expect(getAllByRole(container, 'button').length).toBe(2);
    });

    it('should render DateFilter initial state w/o problem and assign a second startDate', async () => {
        const { container } = render(
            <DateFilter
                column={{
                    ...mockColumn,
                    filterOperator: CompareOperators.Between,
                    filterText: '01/01/2020',
                    filterArgument: ['01/01/2020', '01/01/2020'],
                }}
                onApply={jest.fn()}
            />,
        );

        const clearDateBtns = getAllByRole(container, 'button');
        fireEvent.click(clearDateBtns[1]);

        expect(clearDateBtns[1]).toBeDefined();
    });

    it('should click first datePicker', async () => {
        const { container } = render(
            <DateFilter
                column={{
                    ...mockColumn,
                    filterOperator: CompareOperators.Between,
                    filterText: '01/01/2020',
                    filterArgument: ['01/01/2020', '01/01/2020'],
                }}
                onApply={jest.fn()}
            />,
        );

        const clearDateBtns = getAllByRole(container, 'button');

        expect(fireEvent.click(clearDateBtns[0])).toBeTruthy();
    });
});
