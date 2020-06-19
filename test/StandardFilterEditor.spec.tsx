import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { StandardFilterEditor } from '../src/filterControls/StandardFilterEditor';
import { render, getByRole, getByPlaceholderText } from '@testing-library/react';
import { mockColumn } from './mock';
import { ColumnDataType } from 'tubular-common';

initializeIcons();

describe('StandardFilterEditor', () => {
    it('should render StandardFilterEditor initial state w/o problem', async () => {
        const { container } = render(<StandardFilterEditor column={{...mockColumn, filterText: 'all'}} onApply={() => {}} />);

        expect(getByRole(container, 'textbox')).toBeDefined();
    });

    it('should render StandardFilterEditor initial state w/o problem and add a NumericFilter', async () => {
        const { container } = render(<StandardFilterEditor column={{...mockColumn, filterText: 'all', dataType: ColumnDataType.Numeric}} onApply={() => {}} />);
        expect(getByPlaceholderText(container, 'Type a number')).toBeDefined();
    });

    it('should render StandardFilterEditor initial state w/o problem and add a DateFilter', async () => {
        const { container } = render(<StandardFilterEditor column={{...mockColumn, filterText: 'all', dataType: ColumnDataType.DateTimeUtc}} onApply={() => {}} />);
        expect(getByRole(container, 'combobox')).toBeDefined();
    });

    it('should throw an Error', async () => {

        expect(()=>render(<StandardFilterEditor column={{...mockColumn, dataType: ColumnDataType.Boolean}} onApply={() => {}} />)).toThrowError();
    });
});