import * as React from 'react';
import { ColumnModel, ColumnSortDirection, ColumnDataType } from 'tubular-common';

export const columnsTR = [
    new ColumnModel('OrderID', {
        dataType: ColumnDataType.Numeric,
        filterable: true,
        isKey: true,
        label: 'Id',
        sortDirection: ColumnSortDirection.Ascending,
        sortOrder: 1,
        sortable: true,
    }),
    new ColumnModel('CustomerName', {
        filterable: true,
        searchable: true,
        sortable: true,
    }),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount', {
        dataType: ColumnDataType.Numeric,
        sortable: true,
    }),
];