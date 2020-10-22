import { ColumnDataType, CompareOperators, ColumnSortDirection } from 'tubular-common';
import { ITbColumn } from '../../src/interfaces/ITbColumn';

export const columns: ITbColumn[] = [
    {
        key: 'Actions',
        name: 'Actions',
        fieldName: 'none',
        minWidth: 50,
        tb: {
            isComputed: true,
            dataType: ColumnDataType.String,
        },
    },
    {
        key: 'OrderID',
        name: 'Order ID',
        fieldName: 'OrderID',
        minWidth: 100,
        maxWidth: 110,
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
        minWidth: 100,
        maxWidth: 110,
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
        minWidth: 120,
        maxWidth: 140,
        tb: {
            sortable: true,
            dataType: ColumnDataType.DateTime,
            dateTimeDisplayFormat: 'DD/MM/YYYY - hh:mm:ss A',
        },
    },
];
