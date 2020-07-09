import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { initializeIcons } from '@fluentui/react';
import { TestTbGrid } from './components/TestTbGrid';
import {
    render,
    getAllByRole,
    getByPlaceholderText,
    fireEvent,
    screen,
    within,
    getRoles,
    logRoles,
    RenderResult,
    waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { columns } from '../sample/src/ColumnsDefinition';

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

const waitForInitialLoad = (sut) => {
    const grid = getGridStructure(sut);
    const firstRow = within(grid.rows[0]);
    const cells = firstRow.queryAllByRole('gridcell');
    const firstCell = cells[0];
    expect(cells).toHaveLength(columns.filter((f) => f.tb.visible).length);
    expect(within(firstCell).queryByText(/^\d+$/)).not.toBeNull();
};

describe('TestTbGrid', () => {
    let sut: RenderResult;
    beforeEach(async () => {
        sut = render(
            <TestTbGrid
                filterable={false}
                toggleColumns={false}
                searchable={true}
                recordCounter={false}
                itemsPerPage={10}
            />,
        );

        await waitFor(() => waitForInitialLoad(sut));
    });

    describe('Search', () => {
        it('should search properly', async () => {
            // screen.debug(sut.container);
            const search = getByPlaceholderText(sut.container, 'Search');
            fireEvent.change(search, { target: { value: 'lovely' } });
            fireEvent.keyDown(search, { key: 'Enter', code: 'Enter' });

            const grid = getGridStructure(sut);
            await waitFor(() => {
                const firstRow = within(grid.rows[0]);
                const cells = firstRow.queryAllByRole('gridcell');
                const customerNameCell = cells[1];
                console.log(customerNameCell.innerHTML);
                expect(within(customerNameCell).queryByText(/The/i)).not.toBeNull();
            });
        });
    });
});
