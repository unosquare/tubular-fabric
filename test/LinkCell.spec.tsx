/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { LinkCell } from '../src/cells/index';
import { render, getByText } from '@testing-library/react';

initializeIcons();

describe('LinkCell', () => {
    it('should render initial state w/o problem', async () => {
        const onClick = jest.fn();
        const title = 'Title';
        const { container } = render(<LinkCell value={title} onClick={onClick} />);
        const titleBtn = getByText(container as HTMLElement, title);
        expect(titleBtn).toBeDefined();
    });
});
