import * as React from 'react';
import { TbGrid } from '../../src/TbGrid';
import { columns } from './ColumnsDefinition';
import { useGridRefresh } from 'tubular-react-common/dist/useGridRefresh';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar';
let localData = [
    {
        OrderID: 1,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 300.0,
    },
    {
        OrderID: 2,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 9.0,
    },
    {
        OrderID: 3,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 92.0,
    },
    {
        OrderID: 4,
        CustomerName: 'Vesta',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 300.0,
    },
    {
        OrderID: 5,
        CustomerName: 'Super La Playa',
        ShippedDate: null,
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 174.0,
    },
    {
        OrderID: 6,
        CustomerName: 'OXXO',
        ShippedDate: '',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 92.0,
    },
    {
        OrderID: 7,
        CustomerName: 'Super La Playa',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 300.0,
    },
    {
        OrderID: 8,
        CustomerName: 'Super La Playa',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 15.0,
    },
    {
        OrderID: 9,
        CustomerName: 'OXXO',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 92.0,
    },
    {
        OrderID: 10,
        CustomerName: 'Vesta',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 300.0,
    },
    {
        OrderID: 11,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 16.0,
    },
    {
        OrderID: 12,
        CustomerName: 'OXXO',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 92.0,
    },
    {
        OrderID: 13,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 300.0,
    },
    {
        OrderID: 14,
        CustomerName: 'Vesta',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 60.0,
    },
    {
        OrderID: 15,
        CustomerName: 'Super La Playa',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Portland, OR, US',
        Amount: 192.0,
    },
    {
        OrderID: 16,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 300.0,
    },
    {
        OrderID: 17,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 108.0,
    },
    {
        OrderID: 18,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 92.0,
    },
    {
        OrderID: 19,
        CustomerName: 'Vesta',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 300.0,
    },
    {
        OrderID: 20,
        CustomerName: 'OXXO',
        ShippedDate: '2016-11-04T18:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 78.0,
    },
    {
        OrderID: 21,
        CustomerName: 'Wizeline',
        ShippedDate: '2015-11-04T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 100.0,
    },
    {
        OrderID: 22,
        CustomerName: 'Tiempo Development',
        ShippedDate: '2016-01-04T18:00:00',
        ShipperCity: 'Monterrey, NL, Mexico',
        Amount: 150.0,
    },
];

localData = [];

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
            // source="https://tubular.azurewebsites.net/api/orders/paged"
            source={localData}
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
