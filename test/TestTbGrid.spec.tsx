import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { initializeIcons } from '@fluentui/react';
import { TestTbGrid } from './components/TestTbGrid';
import { render, screen, getAllByRole, within, RenderResult, waitFor, fireEvent } from '@testing-library/react';

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

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        const grid = getGridStructure(sut);
        const firstRow = grid.rows[0];
        const orderIdCell = within(firstRow).getAllByRole('gridcell')[1];
        expect(within(orderIdCell).queryByText(/^\d+$/)).not.toBeNull();
    });

    it('should sort by Customer Name column', async () => {
        const sut = createSut();

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        let customerHeader = within(screen.queryAllByRole('columnheader')[2]).getByRole('button');
        fireEvent.click(customerHeader);

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).not.toBeNull());
        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        customerHeader = within(screen.queryAllByRole('columnheader')[2]).getByRole('button');
        expect(within(customerHeader).getByRole('presentation', { hidden: true })).toBeInTheDocument();
    });

    it('should sort by Customer name and Shipper City', async () => {
        const sut = createSut();

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        let customerHeader = within(screen.queryAllByRole('columnheader')[2]).getByRole('button');
        fireEvent.click(customerHeader);

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).not.toBeNull());
        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        let keyDownEvent = new KeyboardEvent('keydown', { key: 'Control' });
        document.dispatchEvent(keyDownEvent);

        let shipperCityHeader = within(screen.queryAllByRole('columnheader')[3]).getByRole('button');
        fireEvent.click(shipperCityHeader);

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).not.toBeNull());
        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        customerHeader = within(screen.queryAllByRole('columnheader')[2]).getByRole('button');
        shipperCityHeader = within(screen.queryAllByRole('columnheader')[3]).getByRole('button');

        expect(within(customerHeader).getByRole('presentation', { hidden: true })).toBeInTheDocument();
        expect(within(shipperCityHeader).getByRole('presentation', { hidden: true })).toBeInTheDocument();
    });

    it('should sort by Shipper City when Control key is pressed and released', async () => {
        const sut = createSut();

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        let customerHeader = within(screen.queryAllByRole('columnheader')[2]).getByRole('button');
        fireEvent.click(customerHeader);

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).not.toBeNull());
        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        let keyDownEvent = new KeyboardEvent('keydown', { key: 'Control' });
        document.dispatchEvent(keyDownEvent);

        let keyupEvent = new KeyboardEvent('keyup', { key: 'Control' });
        document.dispatchEvent(keyupEvent);

        let shipperCityHeader = within(screen.queryAllByRole('columnheader')[3]).getByRole('button');
        fireEvent.click(shipperCityHeader);

        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).not.toBeNull());
        await waitFor(() => expect(sut.container.querySelector('[aria-busy="true"]')).toBeNull());

        customerHeader = within(screen.queryAllByRole('columnheader')[2]).getByRole('button');
        shipperCityHeader = within(screen.queryAllByRole('columnheader')[3]).getByRole('button');

        expect(within(customerHeader).queryByRole('presentation', { hidden: true })).not.toBeInTheDocument();
        expect(within(shipperCityHeader).getByRole('presentation', { hidden: true })).toBeInTheDocument();
    });
});
