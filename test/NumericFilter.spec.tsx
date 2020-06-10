import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import {  NumericFilter } from '../src/filterControls/NumericFilter';
import { render, getByRole } from '@testing-library/react';
import { mockColumn } from '../src/mocks';

initializeIcons();

describe('NumericFilter', () => {
    it('should render NumericFilter initial state w/o problem', async () => {
        const { container } = render(<NumericFilter column={mockColumn} onApply={() => {}} />);
        expect(getByRole(container, 'spinbutton')).toBeDefined();
    });
});