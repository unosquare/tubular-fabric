import * as React from 'react';
import { TbGrid } from '../../src/TbGrid';
import { columns } from './ColumnsDefinition';
import { useGridRefresh } from 'tubular-react-common/dist/useGridRefresh';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';

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

    return (
        <TbGrid
            columns={columns}
            source="https://tubular.azurewebsites.net/api/orders/paged"
            options={{
                deps: [refresh],
                filterable: true,
                toggleColumns: true,
                commandBarItems: commandItems,
                searchable: true,
                recordCounter: true,
                pagination: {
                    itemsPerPage: 100,
                },
            }}
        />
    );
};
