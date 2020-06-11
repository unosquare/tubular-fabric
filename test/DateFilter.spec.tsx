import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { DateFilter } from '../src/filterControls/DateFilter';
import { render, getAllByRole, getByRole, fireEvent } from '@testing-library/react';
import { mockColumn } from '../src/mocks';
import { CompareOperators } from 'tubular-common';

initializeIcons();

describe('DateFilter', () => {
    it('should render DateFilter initial state w/o problem', async () => {
        const { container } = render(<DateFilter column={{...mockColumn }} onApply={() => {}}  />);
        
        const clearDateBtn = getByRole(container, 'button');
        fireEvent.click(clearDateBtn);

        expect(getByRole(container, 'button')).toBeDefined();
    });

    it('should render DateFilter initial state w/o problem with filter operator: Between', async () => {
        const { container } = render(<DateFilter column={{...mockColumn, filterOperator: CompareOperators.Between, filterArgument: ['x', 'x']  }} onApply={() => {}}  />);
        expect(getAllByRole(container, 'button').length).toBe(2);
    });

    it('should render DateFilter initial state w/o problem and assign a second startDate', async () => {
        const { container } = render(<DateFilter column={{...mockColumn, filterOperator: CompareOperators.Between, filterText: '01/01/2020', filterArgument: ['01/01/2020', '01/01/2020'] }} onApply={() => {}}  />);

        const clearDateBtns = getAllByRole(container, 'button');
        fireEvent.click(clearDateBtns[1]);

        expect(clearDateBtns[1]).toBeDefined();
    });
});