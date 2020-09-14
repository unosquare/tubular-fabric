import { ColumnDataType, CompareOperators, ColumnSortDirection } from 'tubular-common';
import { ITbColumn } from '../../src/interfaces/ITbColumn';

export const columns: ITbColumn[] = [
    {
        key: 'OrderID',
        name: 'Order ID',
        fieldName: 'OrderID',
        minWidth: 50,
        maxWidth: 130,
        isResizable: true,
        tb: {
            isKey: true,
            dataType: ColumnDataType.Numeric,
            sortable: true,
            sortDirection: ColumnSortDirection.Descending,
            sortOrder: 1,
            filterText: '10',
            filterOperator: CompareOperators.Gte,
        },
    },
    {
        key: 'CustomerName',
        name: 'Customer Name',
        fieldName: 'CustomerName',
        minWidth: 120,
        maxWidth: 200,
        tb: {
            dataType: ColumnDataType.String,
            sortable: true,
            searchable: true,
        },
    },
    {
        key: 'ShipperCity',
        name: 'Shipper City',
        fieldName: 'ShipperCity',
        minWidth: 120,
        maxWidth: 200,
        tb: {
            dataType: ColumnDataType.String,
            sortable: true,
            searchable: true,
        },
    },
    {
        key: 'Amount',
        name: 'Amount',
        fieldName: 'Amount',
        minWidth: 120,
        maxWidth: 200,
        tb: {
            dataType: ColumnDataType.Numeric,
            sortable: true,
        },
    },
    {
        key: 'IsShipped',
        name: 'Is Shipped?',
        fieldName: 'IsShipped',
        minWidth: 60,
        maxWidth: 80,
        tb: {
            dataType: ColumnDataType.Boolean,
            sortable: false,
            filterable: false,
        },
    },
    {
        key: 'ShippedDate',
        name: 'Shipped Date',
        fieldName: 'ShippedDate',
        minWidth: 60,
        maxWidth: 80,
        tb: {
            dataType: ColumnDataType.Date,
            sortable: true,
        },
    },
];
