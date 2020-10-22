import * as React from 'react';
import { TbGrid } from '../../src/TbGrid';
import { columns } from './ColumnsDefinition';
import { useGridRefresh } from 'tubular-react-common/dist/useGridRefresh';

const dataSource = 'https://tubular.azurewebsites.net/api/orders/paged';
import { ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IColumn } from '@fluentui/react';
import { getRenderByDataType } from '../../src/utils';
import { ITbColumn } from '../../src/interfaces';
import { TextCell } from '../../src/cells';
import { ColumnModel, parseDateColumnValue } from 'tubular-common';

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
        if (column.key == 'Actions') return <span>NOO</span>;

        const tbColumn = column as ITbColumn;

        return getRenderByDataType(tbColumn.tb as ColumnModel, item[column.fieldName]);
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
