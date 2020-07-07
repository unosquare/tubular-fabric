import * as React from 'react';
import { TbGrid } from '../../src/TbGrid';
import { columns } from './ColumnsDefinition';
import { useGridRefresh } from 'tubular-react-common/dist/useGridRefresh';
import { createFakeRows } from './utils';

const dataSource = createFakeRows(columns, 500);
import { ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IColumn } from '@fluentui/react';
import { getRenderByDataType } from '../../src/utils';

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
            source={'http://somehwere/yeah'}
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
