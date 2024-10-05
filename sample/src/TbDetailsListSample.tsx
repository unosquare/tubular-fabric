import * as React from 'react';
import { useGridRefresh } from 'tubular-react-common/';
import { TbGrid } from '../../src/TbGrid';
import { columns } from './ColumnsDefinition';
import { ICommandBarItemProps } from '@fluentui/react';
import { getRenderByDataType } from '../../src/utils';
import { ColumnModel } from 'tubular-common';
import { createFakeRows } from './utils';
const dataSource = createFakeRows(columns, 500);

export const TbDetailsListSample: React.FunctionComponent = () => {
    const [refresh, forceRefresh] = useGridRefresh();
    const onForceRefresh = () => forceRefresh();

    const commandItems: ICommandBarItemProps[] = [
        {
            key: 'newItem',
            text: 'New',
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Add' },
            subMenuProps: {
                items: [
                    {
                        key: 'emailMessage',
                        text: 'Email message',
                        iconProps: { iconName: 'Mail' },
                        'data-automation-id': 'newEmailButton', // optional
                    },
                    {
                        key: 'calendarEvent',
                        text: 'Calendar event',
                        iconProps: { iconName: 'Calendar' },
                    },
                ],
            },
        },
        {
            key: 'forceRefresh',
            text: 'Force Refresh',
            onClick: onForceRefresh,
        },
    ];

    const onRenderItemColumn = (item: any, index: number, column: ColumnModel) => {
        if (column.name == 'Actions') return <span>NOO</span>;

        return getRenderByDataType(column, item[column.name]);
    };

    return (
        <TbGrid
            columns={columns}
            source={dataSource}
            onRenderItemColumn={onRenderItemColumn}
            options={{
                deps: [refresh],
                filterable: true,
                toggleColumns: true,
                commandBarItems: commandItems,
                searchable: true,
                recordCounter: true,
                callbacks: {
                    onError: (error) => alert(error),
                },
                pagination: {
                    itemsPerPage: 100,
                },
            }}
        />
    );
};
