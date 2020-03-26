import { ColumnDataType, CompareOperators } from 'tubular-common';
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
];
