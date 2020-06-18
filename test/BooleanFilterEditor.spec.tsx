import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { BooleanFilterEditor } from '../src/filterControls/BooleanFilterEditor';
import { render, getByRole, fireEvent, getAllByRole } from '@testing-library/react';
import { mockColumn } from './mock';

initializeIcons();

describe('BooleanFilterEditor', () => {
    it('should render BooleanFilterEditor initial state w/o problem', async () => {
        const { container } = render(<BooleanFilterEditor column={{...mockColumn, filterText: 'all'}} onApply={() => {}} />);
        
        const firstRadioBuutton = getAllByRole(container, 'radio')[0];


        expect(firstRadioBuutton).toBeDefined();
    });

    it('should render BooleanFilterEditor initial state w/o problem and click the firstRadioButton', async () => {
        const { container } = render(<BooleanFilterEditor column={{...mockColumn, filterText: null}} onApply={() => {}} />);
        
        const firstRadioBuutton = getAllByRole(container, 'radio')[0];

        expect(fireEvent.click(firstRadioBuutton)).toBeTruthy();
    });
});