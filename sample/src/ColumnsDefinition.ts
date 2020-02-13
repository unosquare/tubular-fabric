import { ColumnDataType } from 'tubular-common';
import { ITbColumn } from '../../src/ITbColumn';

export const columns: ITbColumn[] = [
    {
        key: 'OrderID',
        name: 'Order ID',
        fieldName: 'OrderID',
        minWidth: 100,
        tb: {
            isKey: true,
            dataType: ColumnDataType.Numeric,
            sortable: true,
        },
    },
    {
        key: 'CustomerName',
        name: 'Customer Name',
        fieldName: 'CustomerName',
        minWidth: 100,
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
        minWidth: 100,
        tb: {
            dataType: ColumnDataType.String,
            sortable: true,
            searchable: true,
        },
    },
    {
        key: 'Amount',
        name: 'Amount asdf asdsa',
        fieldName: 'Amount',
        minWidth: 100,
        tb: {
            dataType: ColumnDataType.Numeric,
            sortable: true,
        },
    },
];
