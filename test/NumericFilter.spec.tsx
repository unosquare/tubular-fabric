import * as React from 'react';
import { initializeIcons, TextField } from '@fluentui/react';
import {  NumericFilter } from '../src/filterControls/NumericFilter';
import { render, getByRole, getAllByRole, fireEvent, getByPlaceholderText } from '@testing-library/react';
import { mockColumn } from './mock';
import { CompareOperators } from 'tubular-common';

initializeIcons();

describe('NumericFilter', () => {
    it('should render NumericFilter initial state w/o problem', async () => {
        const { container } = render(<NumericFilter column={mockColumn} onApply={() => {}} />);
        expect(getByRole(container, 'spinbutton')).toBeDefined();
    });

    it('should render NumericFilter initial state w/o problem and filterOperator is Between', async () => {
        const onApply = jest.fn();
        const { container } = render(<NumericFilter column={{...mockColumn, filterOperator: CompareOperators.Between}} onApply={ onApply } />);

        const inputText = getByPlaceholderText(container, 'To');
        fireEvent.change(inputText, { target: { value: 'a' } });
        
        expect(inputText).toBeDefined();
    });
});