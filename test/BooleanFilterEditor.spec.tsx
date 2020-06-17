import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { BooleanFilterEditor } from '../src/filterControls/BooleanFilterEditor';
import { render, getByRole, fireEvent, getAllByRole } from '@testing-library/react';
import { mockColumn } from './mock';

initializeIcons();

describe('BooleanFilterEditor', () => {
    it('should render BooleanFilterEditor initial state w/o problem', async () => {
        const { container,  debug } = render(<BooleanFilterEditor column={{...mockColumn, filterText: 'all'}} onApply={() => {}} />);
        
        debug();
        const firstRadioBuutton = getAllByRole(container, 'radio')[0];

        fireEvent.change(firstRadioBuutton);

        expect(firstRadioBuutton).toBeDefined();
    });
});