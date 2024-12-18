import { ColumnDataType, CompareOperators, ColumnSortDirection } from 'tubular-common';
import { ITbColumnProxy } from '../../src/interfaces/ITbColumn';
import { TableCellLayout } from '@fluentui/react-components';
import React from 'react';

export type Item = {
    orderId: number;
    customerName: string;
};

export const columns: ITbColumnProxy<Item>[] = [
    {
        name: 'Actions',
        isComputed: true,
        dataType: ColumnDataType.String,
        renderCell: (item) => {
            return <TableCellLayout media={item.customerName}>Edit {item.orderId}</TableCellLayout>;
        },
        renderHeaderCell: () => 'Actions',
    },
    {
        name: 'OrderID',
        label: 'Order ID',
        isKey: true,
        dataType: ColumnDataType.Numeric,
        sortable: true,
        sortDirection: ColumnSortDirection.Descending,
        sortOrder: 1,
        filterText: '10',
        filterOperator: CompareOperators.Gte,
        renderCell: (item) => {
            return <TableCellLayout>{item.orderId}</TableCellLayout>;
        },
        renderHeaderCell: () => 'Order ID',
    },
    {
        name: 'CustomerName',
        label: 'Customer Name',
        dataType: ColumnDataType.String,
        sortable: true,
        searchable: true,
        renderCell: (item) => {
            return <TableCellLayout>{item.customerName}</TableCellLayout>;
        },
        renderHeaderCell: () => 'Customer Name',
    },
];
