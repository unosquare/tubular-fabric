/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { RenderCell } from '../src/cells/index';
import { render, getByText } from '@testing-library/react';
import { InnerTextCell } from '../src/cells/TextCell';

initializeIcons();

describe('RenderCell', () => {
    it('should render initial state w/o problem', async () => {
        const value = 'Lorem ipsum';
        const { container } = render(<RenderCell><InnerTextCell value={value} /></RenderCell>);
        const htmlElement = getByText(container as HTMLElement, value);
        expect(htmlElement).toBeTruthy();
    });
});