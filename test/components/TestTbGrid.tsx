import * as React from 'react';
import { TbGrid } from '../../src/TbGrid';
import { columns } from '../../sample/src/ColumnsDefinition';
import { useGridRefresh } from 'tubular-react-common/dist/useGridRefresh';
import { createFakeRows } from '../../sample/src/utils';

const dataSource = createFakeRows(columns, 500);
import { ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IColumn } from '@fluentui/react';
import { getRenderByDataType } from '../../src/utils';

export interface ITestTbGridrProps {
    filterable: boolean;
    toggleColumns: boolean;
    searchable: boolean;
    recordCounter: boolean;
    itemsPerPage: number;
}

export const TestTbGrid = ({ filterable, toggleColumns, searchable, recordCounter, itemsPerPage }) => {
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
                        ['data-automation-id']: 'newEmailButton', // optional
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

    const onRenderItemColumn = (item: any, index: number, column: IColumn) => {
        if (column.key == 'IsShipped') return <span>NOO</span>;

        return getRenderByDataType(item, column);
    };

    return (
        <TbGrid
            columns={columns}
            source={dataSource}
            onRenderItemColumn={onRenderItemColumn}
            options={{
                deps: [refresh],
                filterable: filterable,
                toggleColumns: toggleColumns,
                commandBarItems: commandItems,
                searchable: searchable,
                recordCounter: recordCounter,
                pagination: {
                    itemsPerPage: itemsPerPage,
                },
            }}
        />
    );
};
