import * as React from 'react';
import { useGridRefresh, useTbList, useTubular } from 'tubular-react-common/';
import { TbGrid } from '../../src/TbGrid';
import { columns, Item } from './ColumnsDefinition';
import { getRenderByDataType } from '../../src/utils';
import { ITbColumn } from '../../src/interfaces';
import useTbFabric from '../../src/useTbFabric';

import { ColumnModel } from 'tubular-common';
import { PresenceBadgeStatus } from '@fluentui/react-components';
import { createFakeRows } from './utils';

const dataSource = createFakeRows(columns, 500);

export const TbDetailsListSample: React.FunctionComponent = () => {
    const [refresh, forceRefresh] = useGridRefresh();
    const onForceRefresh = () => forceRefresh();
    const { state, api } = useTbFabric<Item>(columns, dataSource, {});

    return <TbGrid tbState={state} tbApi={api} />;
};
