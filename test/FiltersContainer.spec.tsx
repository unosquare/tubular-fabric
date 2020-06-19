import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { FiltersContainer } from '../src/index';
import { render, getAllByRole, fireEvent, getByRole } from '@testing-library/react';
import { mockColumn } from './mock';
import { ColumnDataType } from 'tubular-common';

initializeIcons();

describe('FiltersContainer', () => {
    it('should render FiltersContainer initial state w/o problem', async () => {
        const { container } = render(<FiltersContainer columns={[mockColumn]} onApply={() => {}} />);

        expect(getAllByRole(container, 'presentation').length > 0).toBeTruthy();
    });

    it('should render FiltersContainer initial state w/o problem with BooleanFilterEditor', async () => {
        const { container, debug } = render(<FiltersContainer columns={[{...mockColumn, dataType: ColumnDataType.Boolean}]} onApply={() => {}} />);
        expect(getAllByRole(container, 'presentation').length > 0).toBeTruthy();
    });

    it('should render FiltersContainer initial state w/o problem and click to call toggleCollapse', async () => {
        const { container } = render(<FiltersContainer columns={[{...mockColumn, dataType: ColumnDataType.Boolean}]} onApply={() => {}} />);        
        
        const divHeader = container.getElementsByClassName('header-45')[0];
        fireEvent.click(divHeader);

        expect(getByRole(container, 'radiogroup')).toBeDefined();//Improving validation...
    });
});