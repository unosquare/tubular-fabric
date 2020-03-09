import * as React from 'react';
import { TbGrid } from '../../src/TbGrid';
import { columns } from './ColumnsDefinition';
import { useGridRefresh } from 'tubular-react-common/dist/useGridRefresh';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { useTbFabric } from '../../src/useTbFabric';

export const TbDetailsListSample: React.FunctionComponent = () => {
    const [refresh, forceRefresh] = useGridRefresh();
    const onForceRefresh = () => forceRefresh();
    const tbFabricInstance = useTbFabric(columns, "https://tubular.azurewebsites.net/api/orders/paged",{
        deps: [refresh],
        pagination: {
            itemsPerPage: 100,
        }});

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
            key: 'upload',
            text: 'Upload',
            iconProps: { iconName: 'Upload' },
            href: 'https://dev.office.com/fabric',
        },
    ];

    return (
        <>
            <div>
                <button type="button" onClick={onForceRefresh}>
                    Force refresh
                </button>
            </div>
            <TbGrid
                instance={tbFabricInstance}
                options={{
                    deps: [refresh],
                    filterable: true,
                    toggleColumns: true,
                    commandBarItems: commandItems,
                    searchable: true,
                    pagination: {
                        itemsPerPage: 100,
                    },
                }}
            />
        </>
    );
};
