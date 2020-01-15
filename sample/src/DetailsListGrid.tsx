import * as React from 'react';
import { DetailsList, DetailsRow, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { IColumnTRansformer } from './IColumTRansformer';
import { columnsTR } from './ColumnsDefinition';
import { ITbListInstance, ITbOptions, useTubular } from 'tubular-react-common';
import { ColumnModel, TubularHttpClientAbstract, ColumnSortDirection, ColumnDataType } from 'tubular-common';
import { IDetailsRowProps } from 'office-ui-fabric-react';
import ColumnModelOptions from 'tubular-common/dist/Models/ColumnModelOptions';

export interface ITbColumn extends IColumn {
    tb?: ColumnModelOptions;
}

const useTbFabric = (
    initColumns: ITbColumn[],
    source: string | Request | TubularHttpClientAbstract | {}[],
    tubularOptions?: Partial<ITbOptions>,
) => {
    const tbInitColumns = initColumns.map(column => {
        return new ColumnModel(column.name, {
            dataType: column.tb.dataType,
            isKey: column.tb.isKey,
            label: column.ariaLabel,
            sortable: column.tb.sortable,
            filterable: column.tb.filterable,
        });
    });

    const tubular = useTubular(React.useMemo(() => tbInitColumns, [initColumns]), source, tubularOptions);
    const [fabricColumns, setFabricColumns] = React.useState(initColumns);
    const [list, setListState] = React.useState({
        hasNextPage: false,
        // We need to hold all the items that we have loaded
        // This will be a cumulated of all of the rows from tubular instance
        items: [],
    });

    // Reset list is required
    const resetList = () => {
        setListState({ hasNextPage: false, items: [] });
        tubular.api.goToPage(0);
    };

    const sortByColumn = (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => {
        resetList();
        const newFabricColumns = fabricColumns.map(col => {
            if (col.name === column.name) {
                const isSorted = col.isSorted ? (col.isSortedDescending ? false : true) : true;

                return {
                    ...col,
                    isSorted: isSorted,
                    isSortedDescending: isSorted && !col.isSortedDescending
                };
            }

            return col;
        });

        setFabricColumns(newFabricColumns)
        tubular.api.sortColumn(column.name);
    };

    const search = (value: string) => {
        resetList();
        tubular.api.updateSearchText(value);
    };

    const loadMoreItems = (index?: number) => {
        const pageToLoad = index / tubular.state.itemsPerPage;
        if (!tubular.state.isLoading && pageToLoad >= tubular.state.page) {
            tubular.api.goToPage(pageToLoad);
        }
    };

    React.useEffect(() => {
        setListState(state => {
            const mapper = item => {
                const mapped = {};
                columnsTR.forEach(col => {
                    mapped[col.name] = item[col.name];
                });

                const keyColumn = columnsTR.find(col => col.isKey);
                mapped['key'] = `${keyColumn.name}_${item[keyColumn.name]}`;
                mapped['name'] = mapped['key'];

                return mapped;
            };

            const mapped = tubular.state.data.map(mapper);

            const newItems = [...state.items].slice(0, -1).concat(mapped);
            let hasNextPage = false;

            if (state.items.length + tubular.state.data.length < tubular.state.filteredRecordCount) {
                newItems.push(null);
                hasNextPage = true;
            }

            return {
                hasNextPage: hasNextPage,
                items: newItems,
            };
        });
    }, [tubular.state.data]);

    return {
        // API fort a list should be simpler than
        // the one used for a grid
        api: {
            loadMoreItems,
            search,
            sortByColumn,
        },
        state: {
            ...tubular.state,
            list,
            fabricColumns,
        },
    };
};

const columns: ITbColumn[] = [
    {
        key: 'OrderID',
        name: 'OrderID',
        fieldName: 'OrderID',
        minWidth: 100,
        tb: {
            isKey: true,
            dataType: ColumnDataType.Numeric,
            sortable: true,
        }
    },
    {
        key: 'CustomerName',
        name: 'CustomerName',
        fieldName: 'CustomerName',
        minWidth: 100,
        tb: {
            dataType: ColumnDataType.String,
            sortable: true,
        }
    },
    {
        key: 'ShipperCity',
        name: 'ShipperCity',
        fieldName: 'ShipperCity',
        minWidth: 100,
        tb: {
            dataType: ColumnDataType.String,
            sortable: true,
        }
    },
    {
        key: 'Amount',
        name: 'Amount',
        fieldName: 'Amount',
        minWidth: 100,
        tb: {
            dataType: ColumnDataType.Numeric,
            sortable: true,
        }
    }
];

const DetailsListGrid: React.FunctionComponent<any> = () => {
    const tbFabricInstance = useTbFabric(columns, 'https://tubular.azurewebsites.net/api/orders/paged', {
        pagination: { itemsPerPage: 100 },
    });

    const handleMissingItems = (index?: number, rowProps?: IDetailsRowProps): React.ReactNode => {
        const DEFAULT_MISSING_ITEM = {
            key: 'missing',
            name: 'Missing Item',
            value: '-1',
        };

        // tbFabricInstance.api.loadMoreItems(index);

        return (
            <DetailsRow
                {...rowProps}
                item={DEFAULT_MISSING_ITEM}
                styles={{ root: { background: 'red', color: 'white' } }}
            />
        );
    };

    // if (tbFabricInstance.state.list.items.length === 0) return null;

    console.log(tbFabricInstance.state.list.items)
    console.log(tbFabricInstance.state.fabricColumns)
    return (
        <div style={{ height: '600px', overflow: 'auto' }}>
            <DetailsList
                items={tbFabricInstance.state.list.items}
                columns={tbFabricInstance.state.fabricColumns}
                onRenderMissingItem={handleMissingItems}
                onColumnHeaderClick={tbFabricInstance.api.sortByColumn}
            />
        </div>
    );
};

export default DetailsListGrid;
