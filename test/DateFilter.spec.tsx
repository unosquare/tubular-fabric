import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { DateFilter } from '../src/filterControls/DateFilter';
import { render, getAllByRole } from '@testing-library/react';
import { mockColumn } from '../src/mocks';
import { CompareOperators } from 'tubular-common';

initializeIcons();

describe('DateFilter', () => {
    it('should render DateFilter initial state w/o problem', async () => {
        const { container } = render(<DateFilter column={{...mockColumn }} onApply={() => {}}  />);
        expect(getAllByRole(container, 'button')).toBeDefined();
    });

    it('should render DateFilter initial state w/o problem with filter operator: Between', async () => {
        const { container } = render(<DateFilter column={{...mockColumn, filterOperator: CompareOperators.Between }} onApply={() => {}}  />);
        expect(getAllByRole(container, 'button').length).toBe(2);
    });

    it('should render DateFilter initial state w/o problem with startDate', async () => {
        const { container } = render(<DateFilter column={{...mockColumn, filterOperator: CompareOperators.Between, filterText: '01/01/2020' }} onApply={() => {}}  />);
        expect(getAllByRole(container, 'button').length).toBe(2);
    });
});