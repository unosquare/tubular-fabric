import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { BooleanFilterEditor } from '../src/filterControls/BooleanFilterEditor';
import { render, getByRole, fireEvent } from '@testing-library/react';
import { mockColumn } from '../src/mocks';

initializeIcons();

describe('BooleanFilterEditor', () => {
    it('should render BooleanFilterEditor initial state w/o problem', async () => {
        const { container } = render(<BooleanFilterEditor column={{...mockColumn, filterText: 'all'}} onApply={() => {}} />);
        
        expect(getByRole(container, 'radiogroup')).toBeDefined();
    });
});