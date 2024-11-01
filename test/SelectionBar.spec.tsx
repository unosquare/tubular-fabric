/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { initializeIcons, Selection } from '@fluentui/react';
import { SelectionBar } from '../src/index';
import { render } from '@testing-library/react';
initializeIcons();

describe('SelectionBar', () => {
    it('should render FeaturesPanel initial state w/o problem with filters and toggleColumns', async () => {
        const getSelectedCount = () => 0;
        const selection = {
            getSelectedCount,
        } as Selection;
        const { container } = render(<SelectionBar selection={selection} onRemoveAction={jest.fn()} />);

        expect(container.children.length > 0).toBeTruthy();
    });
});
