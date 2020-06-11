import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { StandardFilterEditor } from '../src/filterControls/StandardFilterEditor';
import { render, getByRole, fireEvent } from '@testing-library/react';
import { mockColumn } from '../src/mocks';

initializeIcons();

describe('StandardFilterEditor', () => {
    it('should render StandardFilterEditor initial state w/o problem', async () => {
        const { container } = render(<StandardFilterEditor column={{...mockColumn, filterText: 'all'}} onApply={() => {}} />);

        expect(getByRole(container, 'textbox')).toBeDefined();


    });
});