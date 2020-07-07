import { ITbColumn } from './interfaces/ITbColumn';
import { TubularHttpClientAbstract } from 'tubular-common/dist/Http';
import { ITbOptions } from 'tubular-react-common/dist/types';
import {
    ColumnModel,
    ColumnSortDirection,
    CompareOperators,
    createColumn,
    columnHasFilter,
} from 'tubular-common/dist/Models';
import { useTubular } from 'tubular-react-common/dist/useTubular';
import * as React from 'react';
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { ITbFabricInstance } from './interfaces/ITbFabricInstance';
import { unstable_batchedUpdates } from 'react-dom';

const getShimmerSlots = (itemCount: number): any[] => {
    const initialShimmerItems = [];
    [...Array(itemCount)].forEach(() => initialShimmerItems.push(null));

    return initialShimmerItems;
};

export const useTbFabric = (
    initColumns: ITbColumn[],
    source: string | Request | TubularHttpClientAbstract | any[],
    tubularOptions?: Partial<ITbOptions>,
): ITbFabricInstance => {
    const tbInitColumns = initColumns.map((column) => {
        const tbColumn = createColumn(column.fieldName, {
            dataType: column.tb.dataType,
            filterable: column.tb.hasOwnProperty('filterable') ? column.tb.filterable : true,
            isKey: column.tb.isKey ? column.tb.isKey : false,
            label: column.name ? column.name : (column.fieldName || '').replace(/([a-z])([A-Z])/g, '$1 $2'),
            searchable: column.tb.searchable ? column.tb.searchable : false,
            sortDirection: column.tb.sortDirection ? column.tb.sortDirection : ColumnSortDirection.None,
            sortOrder: column.tb.sortOrder ? column.tb.sortOrder : -1,
            sortable: column.tb.sortable ? column.tb.sortable : false,
            visible: column.tb.hasOwnProperty('visible') ? column.tb.visible : true,
            filterText: column.tb.filterText,
            filterArgument: column.tb.filterArgument,
            filterOperator: column.tb.filterOperator || CompareOperators.None,
        });

        column.tb = { ...tbColumn };
        column.isSorted = tbColumn.sortDirection !== ColumnSortDirection.None;
        column.isSortedDescending = column.isSorted ? tbColumn.sortDirection === ColumnSortDirection.Descending : false;

        return tbColumn;
    });

    const { deps, ...rest } = tubularOptions;

    const memoTbColumns = React.useMemo(() => tbInitColumns, [initColumns]);
    const tubular = useTubular(memoTbColumns, source, rest);
    const [fabricColumns, setFabricColumns] = React.useState(initColumns);
    const [list, setListState] = React.useState({
        initialized: false,
        // We need to hold all the items that we have loaded
        // This will be a cumulated of all of the rows from tubular instance
        items: getShimmerSlots(tubular.state.itemsPerPage),
    });

    // Reset list is required
    const resetList = () => {
        setListState({ initialized: true, items: getShimmerSlots(tubular.state.itemsPerPage) });

        if (tubular.state.page === 0) {
            tubular.api.setColumns([...tubular.state.columns]);
        }

        tubular.api.goToPage(0);
    };

    const sortByColumn = (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => {
        resetList();
        const newFabricColumns = fabricColumns.map((col) => {
            if (col.fieldName === column.fieldName) {
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
        tubular.api.sortColumn(column.fieldName);
    };

    const search = (value: string) => {
        resetList();
        tubular.api.updateSearchText(value);
    };

    const updateVisibleColumns = (columns: ColumnModel[]): [ITbColumn[], ColumnModel[]] => {
        const newFabricColumns = [...fabricColumns];
        columns.forEach((tbColumn) => {
            const fabricColumn = newFabricColumns.find((c) => c.fieldName === tbColumn.name);
            fabricColumn.tb.visible = tbColumn.visible;
        });

        return [newFabricColumns, columns];
    };

    const loadMoreItems = (index?: number) => {
        // Tubular core will load the first page by default
        // That's why we don't need to do any call for the first
        // page set
        if (index < tubular.state.itemsPerPage) {
            return;
        }

        const pageToLoad = Math.ceil(index / tubular.state.itemsPerPage) - 1;
        if (!tubular.state.isLoading && pageToLoad > tubular.state.page) {
            tubular.api.goToPage(pageToLoad);
        }
    };

    const applyFilters = (columns: ColumnModel[]): ColumnModel[] => {
        columns.forEach((fColumn) => {
            const column = columns.find((c: ColumnModel) => c.name === fColumn.name);

            if (columnHasFilter(fColumn)) {
                column.filterText = fColumn.filterText;
                column.filterOperator = fColumn.filterOperator;
                column.filterArgument = fColumn.filterArgument;

                if (
                    column.filterOperator === CompareOperators.Between &&
                    (!column.filterArgument || !column.filterArgument[0])
                ) {
                    column.filterOperator = CompareOperators.Gte;
                    column.filterArgument = null;
                }
            } else {
                column.filterText = null;
                column.filterOperator = CompareOperators.None;
                column.filterArgument = null;
            }
        });

        return columns;
    };

    const applyOrResetFilter = (columnName: string, value?: string) => {
        const newColumns = tubular.state.columns.map((column) => {
            if (column.name === columnName) {
                return {
                    ...column,
                    filterText: value,
                    filterOperator: !!value ? CompareOperators.Equals : CompareOperators.None,
                    filterArgument: !!value ? [] : null,
                };
            }

            return column;
        });

        unstable_batchedUpdates(() => {
            setListState({ initialized: true, items: getShimmerSlots(tubular.state.itemsPerPage) });

            tubular.api.setColumns(newColumns);
        });
    };

    const applyFilter = (columnName: string, value: string) => applyOrResetFilter(columnName, value);

    const applyFeatures = (columns: ColumnModel[]) => {
        const result = updateVisibleColumns(columns);
        const tbColumns = applyFilters(result[1]);

        unstable_batchedUpdates(() => {
            if (tbColumns.find((c) => columnHasFilter(c))) {
                setListState({ initialized: true, items: getShimmerSlots(tubular.state.itemsPerPage) });
            }

            setFabricColumns(result[0]);
            tubular.api.setColumns(tbColumns);
        });
    };

    const clearFilter = (columnName: string) => applyOrResetFilter(columnName, null);

    const fabricColumnsMapper = (item) => {
        const mapped: any = {};
        const tbColumns = tubular.state.columns;

        tbColumns.forEach((col) => {
            mapped[col.name] = item[col.name];
        });

        const keyColumn = tbColumns.find((col) => col.isKey);

        if (keyColumn) {
            // Random black magic, don't touch
            mapped.key = `${keyColumn.name}_${item[keyColumn.name]}`;
            mapped.name = mapped.key;
        }

        return mapped;
    };

    React.useEffect(() => {
        setListState((state) => {
            if (tubular.state.error) {
                return {
                    items: [],
                    initialized: true,
                };
            }

            // We don't want to override the state for shimmer
            if (tubular.state.data.length === 0 && !state.initialized) {
                return {
                    ...state,
                    initialized: true,
                };
            }

            const mapped = tubular.state.data.map(fabricColumnsMapper);

            let newItems = [...state.items].slice(0, -1 * tubular.state.itemsPerPage).concat(mapped);

            if (newItems.length < tubular.state.filteredRecordCount) {
                newItems = newItems.concat(getShimmerSlots(tubular.state.itemsPerPage));
            }

            return {
                ...state,
                items: newItems,
            };
        });
    }, [tubular.state.data, tubular.state.error]);

    const listDeps = deps || [];

    React.useEffect(() => {
        resetList();
    }, listDeps);

    return {
        // API fort a list should be simpler than
        // the one used for a grid
        api: {
            loadMoreItems,
            search,
            sortByColumn,
            applyFilters,
            applyFilter,
            clearFilter,
            updateVisibleColumns,
            applyFeatures,
            ...tubular.api,
        },
        state: {
            ...tubular.state,
            list: { items: list.items },
            fabricColumns: fabricColumns.filter((c) => c.tb.visible),
        },
    } as ITbFabricInstance;
};
