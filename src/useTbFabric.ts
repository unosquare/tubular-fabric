import { ITbColumn } from './ITbColumn';
import { TubularHttpClientAbstract } from 'tubular-common/dist/Http';
import { ITbOptions } from 'tubular-react-common/dist/types';
import { ColumnModel } from 'tubular-common/dist/Models';
import { useTubular } from 'tubular-react-common/dist/useTubular';
import * as React from 'react';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';

export const useTbFabric = (
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

    const memoTbColumns = React.useMemo(() => tbInitColumns, [initColumns]);
    const tubular = useTubular(memoTbColumns, source, tubularOptions);
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
                const isSortedDescending = col.isSorted && !col.isSortedDescending;
                const isSorted = col.isSorted ? (col.isSortedDescending ? false : true) : true;

                return {
                    ...col,
                    isSorted: isSorted,
                    isSortedDescending: isSortedDescending,
                };
            }

            return {
                ...col,
                isSorted: false,
                isSortedDescending: false,
            };
        });

        setFabricColumns(newFabricColumns);
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

    const fabricColumnsMapper = item => {
        const mapped = {};
        const tbColumns = tubular.state.columns;

        tbColumns.forEach(col => {
            mapped[col.name] = item[col.name];
        });

        const keyColumn = tbColumns.find(col => col.isKey);
        mapped['key'] = `${keyColumn.name}_${item[keyColumn.name]}`;
        mapped['name'] = mapped['key'];

        return mapped;
    };

    React.useEffect(() => {
        setListState(state => {
            const mapped = tubular.state.data.map(fabricColumnsMapper);

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
