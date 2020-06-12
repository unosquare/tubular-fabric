import * as React from 'react';
import { ChipBar } from '../src/index';
import { render, getByRole, fireEvent } from '@testing-library/react';
import { mockColumn } from '../src/mocks';
import { initializeIcons } from '@fluentui/react';

initializeIcons();

describe('ChipBar', () => {
    it('should render ChipBar initial state w/o problem', async () => {  
        const onClearFilter = jest.fn();
        const { container } = render(<ChipBar columns={[mockColumn]} onClearFilter={onClearFilter} />);      
        const rmFilterBtn = getByRole(container, 'button');
        expect(rmFilterBtn).toBeDefined();
    });

    it('Should execute onClearFilter function once', () => {
        const onClearFilter = jest.fn();
        const { container } = render(<ChipBar columns={[mockColumn]} onClearFilter={onClearFilter} />);
        const rmFilterBtn = getByRole(container, 'button');
        fireEvent.click(rmFilterBtn);
        expect(onClearFilter.mock.calls.length).toBe(1);
    });
});