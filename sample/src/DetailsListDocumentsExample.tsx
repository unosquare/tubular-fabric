import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
    IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { useTbTable, ITbOptions } from 'tubular-react-common';
import { ITubularHttpClient, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: IDocument[];
    isCompactMode: boolean;
}

export interface IDocument {
    OrderID: number;
    CustomerName: string;
    ShipperCity: string;
    Amount: number;
}

const columnsTR = [
    new ColumnModel('OrderID', {
        DataType: ColumnDataType.NUMERIC,
        Filterable: true,
        IsKey: true,
        Label: 'Id',
        SortDirection: ColumnSortDirection.ASCENDING,
        SortOrder: 1,
        Sortable: true,
    }),
    new ColumnModel('CustomerName', {
        Filterable: true,
        Searchable: true,
        Sortable: true,
    }),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount', {
        DataType: ColumnDataType.NUMERIC,
        Sortable: true,
    }),
];

const columns: IColumn[] = [
    {
        key: 'OrderID',
        name: 'Order ID',
        fieldName: 'OrderID',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true,
    },
    {
        key: 'CustomerName',
        name: 'Customer Name',
        fieldName: 'CustomerName',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true,
    },    
    {
        key: 'ShipperCity',
        name: 'Shipper City',
        fieldName: 'ShipperCity',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true,
    },
    {
        key: 'Amount',
        name: 'Amount',
        fieldName: 'Amount',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        isPadded: true,
    },
];

function useTBTable(columns: ColumnModel[], source: string | any[] | Request | ITubularHttpClient, tubularOptions?: Partial<ITbOptions> ){
    return useTbTable(columns, source, tubularOptions); 
}

const DetailsListDocumentsExample: React.FunctionComponent = () => {

     const { state } = useTBTable(columnsTR, 'https://tubular.azurewebsites.net/api/orders/paged');       

    return (
            <Fabric>
                <DetailsList
                    items={state.data}
                    compact={false}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                />
            </Fabric>
        );
};

export default DetailsListDocumentsExample;
