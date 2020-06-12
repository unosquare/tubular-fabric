import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { ToggleColumns } from '../src/ToggleColumns';
import { render, getAllByRole, fireEvent, getByRole } from '@testing-library/react';
import { mockColumn } from '../src/mocks';
import { CompareOperators, ColumnDataType, ColumnModel } from 'tubular-common';

initializeIcons();

describe('FiltersContainer', () => {
    it('should render FiltersContainer initial state w/o problem', async () => {
        const { container } = render(<ToggleColumns columns={[mockColumn]} setColumns={(colums: ColumnModel[]) => {}} />);

        expect(getAllByRole(container, 'checkbox').length > 0).toBeTruthy();
    });
});