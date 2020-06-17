import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { SelectionBar } from '../src/index';
import { render, getByRole } from '@testing-library/react';
initializeIcons();

describe('SelectionBar', () => {
    it('should render FeaturesPanel initial state w/o problem with filters and toggleColumns', async () => {
        const { container } = render(<SelectionBar 
            selection={{getSelectedCount: () => {0}}}
            onRemoveAction={(selection) => {}}
             />);

        expect(container.children.length > 0).toBeTruthy();
    });
});