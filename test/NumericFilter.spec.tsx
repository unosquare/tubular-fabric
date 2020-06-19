import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import {  NumericFilter } from '../src/filterControls/NumericFilter';
import { render, getByRole, fireEvent, getByPlaceholderText } from '@testing-library/react';
import { mockColumn } from './mock';
import { CompareOperators } from 'tubular-common';

initializeIcons();

describe('NumericFilter', () => {
    it('should render NumericFilter initial state w/o problem', async () => {
        const { container } = render(<NumericFilter column={mockColumn} onApply={() => {}} />);
        expect(getByRole(container, 'spinbutton')).toBeDefined();
    });

    it('should render NumericFilter initial state w/o problem and filterOperator is Between with defaultValue empty', async () => {
        const onApply = jest.fn();
        const { container } = render(<NumericFilter column={{...mockColumn, filterArgument:null, filterOperator: CompareOperators.Between}} onApply={ onApply } />);

        const inputNumber = getByPlaceholderText(container, 'To');
        
        expect((inputNumber as HTMLInputElement).value).toBe('');
    });

    it('should assign a value to the first input', async () => {
        const onApply = jest.fn();
        const { container } = render(<NumericFilter column={{...mockColumn, filterOperator: CompareOperators.Between}} onApply={ onApply } />);

        const inputNumber = getByPlaceholderText(container, 'From');

        const value = '1';
        fireEvent.change(inputNumber, { target: { value: value } });

        expect((inputNumber as HTMLInputElement).value).toBe(value);
    });

    it('should assign a value to the second input', async () => {
        const onApply = jest.fn();
        const { container } = render(<NumericFilter column={{...mockColumn, filterOperator: CompareOperators.Between}} onApply={ onApply } />);

        const inputNumber = getByPlaceholderText(container, 'To');

        const value = '5';
        fireEvent.change(inputNumber, { target: { value: value } });

        expect((inputNumber as HTMLInputElement).value).toBe(value);
    });
});