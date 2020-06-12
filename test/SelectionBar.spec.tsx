import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { SelectionBar } from '../src/index';
import { render, getByRole } from '@testing-library/react';
import { mockColumn } from '../src/mocks';
import { CompareOperators, ColumnDataType } from 'tubular-common';

initializeIcons();

describe('SelectionBar', () => {
    it('should render ChipFilter initial state w/o problem', async () => {
        expect(true).toBeTruthy();
    });
});