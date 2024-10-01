import { ColumnDataType, CompareOperators, ColumnSortDirection, ColumnModel } from 'tubular-common';
import {
    Button,
    createTableColumn,
    CreateTableColumnOptions,
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    PresenceBadgeStatus,
    TableCellActions,
    TableCellLayout,
    TableColumnDefinition,
} from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import React from 'react';
import { ITbColumn } from '../../src/interfaces';

export type Item = {
    index: number;
    orderId: number;
    customerName: string;
    shipperCity: string;
};

const createTbColumn = <TItem,>(
    options: CreateTableColumnOptions<TItem>,
    tbOptions: Partial<ColumnModel>,
): ITbColumn<TItem> => {
    return {
        ...createTableColumn<TItem>(options),
        tb: {
            ...tbOptions,
        },
    };
};

export const columns: ITbColumn<Item>[] = [
    createTbColumn<Item>(
        {
            columnId: 'orderId',
            compare: (a, b) => {
                return a.orderId - b.orderId;
            },
            renderHeaderCell: () => {
                return 'Order ID';
            },
            renderCell: (item) => {
                return (
                    <TableCellLayout>
                        <strong>ass</strong>
                        {item.orderId}
                        <TableCellActions>
                            <Menu>
                                <MenuTrigger>
                                    <Button appearance="subtle" aria-label="more" icon={<MoreHorizontalRegular />} />
                                </MenuTrigger>

                                <MenuPopover>
                                    <MenuList>
                                        <MenuItem>Item</MenuItem>
                                        <MenuItem>Item</MenuItem>
                                        <MenuItem>Item</MenuItem>
                                    </MenuList>
                                </MenuPopover>
                            </Menu>
                        </TableCellActions>
                    </TableCellLayout>
                );
            },
        },
        {
            isKey: true,
            dataType: ColumnDataType.Numeric,
            sortable: true,
            sortDirection: ColumnSortDirection.Descending,
            sortOrder: 1,
            filterText: '10',
            filterOperator: CompareOperators.Gte,
        },
    ),
];

// {
//     key: 'Actions',
//     name: 'Actions',
//     fieldName: 'none',
//     minWidth: 50,
//     tb: {
//         isComputed: true,
//         dataType: ColumnDataType.String,
//     },
// },
// {
//     key: 'OrderID',
//     name: 'Order ID',
//     fieldName: 'OrderID',
//     minWidth: 100,
//     maxWidth: 110,
//     isResizable: true,
//     tb: {
//         isKey: true,
//         dataType: ColumnDataType.Numeric,
//         sortable: true,
//         sortDirection: ColumnSortDirection.Descending,
//         sortOrder: 1,
//         filterText: '10',
//         filterOperator: CompareOperators.Gte,
//     },
// },
// {
//     key: 'CustomerName',
//     name: 'Customer Name',
//     fieldName: 'CustomerName',
//     minWidth: 120,
//     maxWidth: 200,
//     tb: {
//         dataType: ColumnDataType.String,
//         sortable: true,
//         searchable: true,
//     },
// },
// {
//     key: 'ShipperCity',
//     name: 'Shipper City',
//     fieldName: 'ShipperCity',
//     minWidth: 120,
//     maxWidth: 200,
//     tb: {
//         dataType: ColumnDataType.String,
//         sortable: true,
//         searchable: true,
//     },
// },
// {
//     key: 'Amount',
//     name: 'Amount',
//     fieldName: 'Amount',
//     minWidth: 100,
//     maxWidth: 110,
//     tb: {
//         dataType: ColumnDataType.Numeric,
//         sortable: true,
//     },
// },
// {
//     key: 'IsShipped',
//     name: 'Is Shipped?',
//     fieldName: 'IsShipped',
//     minWidth: 60,
//     maxWidth: 80,
//     tb: {
//         dataType: ColumnDataType.Boolean,
//         sortable: false,
//         filterable: false,
//     },
// },
// {
//     key: 'ShippedDate',
//     name: 'Shipped Date',
//     fieldName: 'ShippedDate',
//     minWidth: 120,
//     maxWidth: 140,
//     tb: {
//         sortable: true,
//         dataType: ColumnDataType.DateTime,
//         dateTimeDisplayFormat: 'DD/MM/YYYY - hh:mm:ss A',
//     },
// },
