import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { ChipFilter } from '../src/index';
import { render, getByRole } from '@testing-library/react';
import { mockColumn } from '../src/mocks';
import { CompareOperators, ColumnDataType } from 'tubular-common';

initializeIcons();

describe('ChipFilter', () => {
    it('should render ChipFilter initial state w/o problem', async () => {  
        const onRemoveFilter = jest.fn();
        const { container } = render(<ChipFilter column={mockColumn} onRemoveFilter={onRemoveFilter} />);      
        const rmFilterBtn = getByRole(container, 'button');
        expect(rmFilterBtn).toBeDefined();
    });

    it('should render ChipFilter initial state w/o problem and show filterArgument as a FriendlyDateString', async () => {  
        const onRemoveFilter = jest.fn();
        const { container } = render(<ChipFilter column={{...mockColumn, filterOperator: CompareOperators.Between, filterArgument: ['01/01/2020'], dataType: ColumnDataType.Date}} onRemoveFilter={onRemoveFilter} />);      
        const rmFilterBtn = getByRole(container, 'button');
        expect(rmFilterBtn).toBeDefined();
    });
    
    it('should render ChipFilter initial state w/o problem and show filterArgument', async () => {  
        const onRemoveFilter = jest.fn();
        const { container } = render(<ChipFilter column={{...mockColumn, filterOperator: CompareOperators.Between, filterArgument: ['01/01/2020'], dataType: ColumnDataType.String}} onRemoveFilter={onRemoveFilter} />);      
        const rmFilterBtn = getByRole(container, 'button');
        expect(rmFilterBtn).toBeDefined();
    });

    it('should render ChipFilter initial state w/o problem and show CheckboxCompositeReversed icon', async () => {  
        const onRemoveFilter = jest.fn();
        const { container } = render(<ChipFilter column={{...mockColumn, filterOperator: CompareOperators.None, filterText: 'true', dataType: ColumnDataType.Boolean}} onRemoveFilter={onRemoveFilter} />);

        const icon = container.firstChild.childNodes[2].firstChild.firstChild;
        expect((icon as HTMLElement).getAttribute('data-icon-name')).toBe('CheckboxCompositeReversed');
    });

    it('should render ChipFilter initial state w/o problem and show Checkbox icon', async () => {  
        const onRemoveFilter = jest.fn();
        const { container } = render(<ChipFilter column={{...mockColumn, filterOperator: CompareOperators.None, filterText: 'false', dataType: ColumnDataType.Boolean}} onRemoveFilter={onRemoveFilter} />);

        const icon = container.firstChild.childNodes[2].firstChild.firstChild;
        expect((icon as HTMLElement).getAttribute('data-icon-name')).toBe('Checkbox');
    });
});