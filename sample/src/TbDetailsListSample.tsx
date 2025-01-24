import * as React from 'react';
import { useGridRefresh } from 'tubular-react-common/';
import { TbGrid } from '../../src/TbGrid';
import useTbFabric from '../../src/useTbFabric';

import { createFakeRows } from './utils';
import { Item, columns } from './ColumnsDefinition';
import { TbList } from '../../src/TbList';
import useTbInfiniteList from '../../src/useTbInfiniteList';

const dataSource = createFakeRows<Item>(columns, 500);

export const TbDetailsListSample: React.FunctionComponent = () => {
    const instance = useTbInfiniteList<Item>(columns, dataSource);
    return (
        <div style={{ width: '100%', height: 500 }}>
            <TbList tbInstance={instance} rowSelectionEnabled={false} />
        </div>
    );
};
