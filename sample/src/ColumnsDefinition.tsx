import { ColumnDataType, CompareOperators, ColumnSortDirection, createColumn, ColumnModel } from 'tubular-common';
import { ITbColumn, ITbColumnProxy } from '../../src/interfaces/ITbColumn';
import { TableCellLayout } from '@fluentui/react-components';

export type Item = {
    orderId: number;
    customerName: string;
};

export const columns: ColumnModel[] = [
    createColumn('Actions', {
        isComputed: true,
        dataType: ColumnDataType.String,
        sortable: false,
    }),
    createColumn('orderId', {
        label: 'Order ID',
        isKey: true,
        isComputed: false,
        sortable: true,
        dataType: ColumnDataType.Numeric,
    }),
    createColumn('customerName', {
        label: 'Customer Name',
        isKey: false,
        isComputed: false,
        sortable: true,
        dataType: ColumnDataType.String,
    }),
];
