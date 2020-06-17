import * as React from 'react';
import { initializeIcons } from '@fluentui/react';
import { FeaturesPanel } from '../src';
import { render } from '@testing-library/react';
import { mockColumn } from './mock';

initializeIcons();

describe('FeaturesPanel', () => {
    it('should render FeaturesPanel initial state w/o problem with filters and toggleColumns', async () => {
        const { container } = render(<FeaturesPanel 
            closePanel={() => {}}
            columns={[mockColumn]}
            onApplyFeatures={(value) => {}}
            toggleColumns={true}
            filterable={true}
             />);

        expect(container.children.length > 0).toBeTruthy();
    });
});