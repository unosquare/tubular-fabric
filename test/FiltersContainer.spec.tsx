import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { FiltersContainer } from '../src/index';
import { render, getAllByRole, fireEvent } from '@testing-library/react';
import { mockColumn } from '../src/mocks';
import { CompareOperators, ColumnDataType } from 'tubular-common';

initializeIcons();

describe('FiltersContainer', () => {
    it('should render FiltersContainer initial state w/o problem', async () => {
        const { container } = render(<FiltersContainer columns={[mockColumn]} onApply={() => {}} />);
        expect(getAllByRole(container, 'presentation').length > 0).toBeTruthy();
    });

    it('should render FiltersContainer initial state w/o problem with BooleanFilterEditor', async () => {
        const { container } = render(<FiltersContainer columns={[{...mockColumn, dataType: ColumnDataType.Boolean}]} onApply={() => {}} />);
                
        expect(container).toBeDefined(); //Improving validation...
    });

    it('should render FiltersContainer initial state w/o problem and click to call toggleCollapse', async () => {
        const { container, debug } = render(<FiltersContainer columns={[{...mockColumn, dataType: ColumnDataType.Boolean}]} onApply={() => {}} />);
        
        debug();

        const divHeader = container.getElementsByClassName('header-45')[0];
        fireEvent.click(divHeader);

        debug();

        expect(container).toBeDefined();//Improving validation...
    });
});