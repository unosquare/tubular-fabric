import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { StringFilter } from '../src/filterControls/StringFilter';
import { render, getByRole } from '@testing-library/react';

initializeIcons();

describe('StringFilter', () => {
    it('should render StringFilter initial state w/o problem', async () => {
        const column = { filterText: 'FilterText'};
        const { container } = render(<StringFilter column={column} onEnter={() => {}} />);
        expect(getByRole(container, 'textbox')).toBeDefined();
    });
});