import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { initializeIcons } from '@fluentui/react';
import { TestTbGrid } from './components/TestTbGrid';
import { render, getAllByRole, within, RenderResult, waitFor } from '@testing-library/react';

initializeIcons();

const getGridStructure = (sut: RenderResult) => {
    const grid = within(sut.container).getByRole('grid');
    const presentationRoles = getAllByRole(grid, 'presentation');

    return {
        header: presentationRoles[0],
        body: presentationRoles[1],
        rows: within(presentationRoles[1]).getAllByRole('row'),
    };
};

const createSut = () => {
    return render(
        <TestTbGrid
            filterable={false}
            toggleColumns={false}
            searchable={true}
            recordCounter={false}
            itemsPerPage={10}
        />,
    );
};

describe('TestTbGrid', () => {
    it('should show shimmers', async () => {
        const sut = createSut();
        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).not.toBeNull());
    });

    it('should render first column with sample data', async () => {
        const sut = createSut();

        await waitFor(() => {
            const grid = getGridStructure(sut);
            const firstRow = grid.rows[0];
            const orderIdCell = within(firstRow).getAllByRole('gridcell')[0];
            expect(within(orderIdCell).queryByText(/^\d+$/)).not.toBeNull();
        });
    });
});
