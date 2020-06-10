import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { LinkCell } from '../src/cells/index';
import { render } from '@testing-library/react';

initializeIcons();

describe('LinkCell', () => {
    it('should render initial state w/o problem', async () => {
        const onClick = ()=>{};
        const { container } = render(<LinkCell value='Title' onClick={onClick} />);
        expect(container).toBeDefined();
    });
});