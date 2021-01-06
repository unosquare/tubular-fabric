import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { SelectionBar } from '../src/index';
import { render } from '@testing-library/react';
initializeIcons();

describe('SelectionBar', () => {
    it('should render FeaturesPanel initial state w/o problem with filters and toggleColumns', async () => {
        const getSelectedCount = () => 0;
        const selection = {
            getSelectedCount,
        };
        const { container } = render(<SelectionBar selection={selection} onRemoveAction={(x) => {}} />);

        expect(container.children.length > 0).toBeTruthy();
    });
});
