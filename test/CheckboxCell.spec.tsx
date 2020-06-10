import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { CheckboxCell } from '../src/cells/index';
import { render } from '@testing-library/react';

initializeIcons();

describe('CheckboxCell', () => {
    it('should render initial state w/o problem', async () => {
        const { container, debug } = render(<CheckboxCell checked={false} />);
        debug();
        expect(container).toBeDefined();
    });
});