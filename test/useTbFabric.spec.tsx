import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { useTbFabric } from '../src';
import { render, getAllByRole } from '@testing-library/react';
import { mockColumn } from './mock';
import { ColumnModel } from 'tubular-common';

initializeIcons();

describe('useTbFabric', () => {
    it('useTbFabric', async () => {
        expect(true).toBeTruthy(); //Working...
    });
});