import * as React from 'react';
import { useGridRefresh } from 'tubular-react-common/';
import { TbGrid } from '../../src/TbGrid';
import useTbFabric from '../../src/useTbFabric';

import { createFakeRows } from './utils';
import { Item, columns } from './ColumnsDefinition';

const dataSource = createFakeRows(columns, 500);

export const TbDetailsListSample: React.FunctionComponent = () => {
    const { state, api } = useTbFabric<Item>(columns, dataSource, {});

    return <TbGrid tbState={state} tbApi={api} />;
};
