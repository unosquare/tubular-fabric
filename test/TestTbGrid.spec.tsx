import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { TestTbGrid } from './components/TestTbGrid';
import { render, getAllByRole, getByPlaceholderText, fireEvent } from '@testing-library/react';

initializeIcons();

describe('TestTbGrid', () => {
    it('should render TestTbGrid initial state w/o problem', async () => {
        const { container } = render(<TestTbGrid 
            filterable={true}
            toggleColumns={true}
            searchable={true}
            recordCounter={true}
            itemsPerPage={10}
         />);

        expect(getAllByRole(container, 'button').length > 0).toBeTruthy();
    });

    it('Search', async () => {
        const { container } = render(<TestTbGrid 
            filterable={false}
            toggleColumns={false}
            searchable={true}
            recordCounter={false}
            itemsPerPage={10}
         />);
        
        const search = getByPlaceholderText(container, 'Search');

        fireEvent.change(search);

        expect(getByPlaceholderText(container, 'Search')).toBeDefined();
    });
});