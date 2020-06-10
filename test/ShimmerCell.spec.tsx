import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { ShimmerCell } from '../src/cells/index';
import { render } from '@testing-library/react';

initializeIcons();

describe('ShimmerCell', () => {
    it('should render initial state w/o problem', async () => {
        const { container } = render(<ShimmerCell />);
        expect(container.firstChild).toBeDefined();
    });
});