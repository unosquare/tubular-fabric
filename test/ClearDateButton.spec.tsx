/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { ClearDateButton } from '../src/filterControls/ClearDateButton';
import { render, getByRole } from '@testing-library/react';

initializeIcons();

describe('ClearDateButton', () => {
    it('should render initial state w/o problem', async () => {
        const onClick = () => {};
        const { container } = render(<ClearDateButton onClick={onClick} />);
        expect(getByRole(container, 'button')).toBeDefined();
    });
});
