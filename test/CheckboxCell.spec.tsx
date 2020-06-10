import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { CheckboxCell } from '../src/cells/index';
import { render } from '@testing-library/react';

initializeIcons();

describe('CheckboxCell', () => {
    it('should render initial state w/o problem', async () => {
        const { container } = render(<CheckboxCell checked={true} />);
        expect(container.firstChild.firstChild.firstChild).toBeTruthy();
    });
});