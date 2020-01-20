import { ColumnDataType } from 'tubular-common';
import { ITbColumn } from '../../src/ITbColumn';

export const columns: ITbColumn[] = [
    {
        key: 'OrderID',
        name: 'OrderID',
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
        name: 'CustomerName',
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
        name: 'ShipperCity',
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
        name: 'Amount',
        fieldName: 'Amount',
        minWidth: 100,
        tb: {
            dataType: ColumnDataType.Numeric,
            sortable: true,
        },
    },
];
