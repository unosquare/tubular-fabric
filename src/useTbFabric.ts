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
import { ITbFabricApi } from './interfaces';

const createInitialTbColumns = (fabricColumns: ITbColumn[]) => {
    return fabricColumns.map((column) => {
        const tbColumn = createColumn(column.fieldName, {
            dataType: column.tb.dataType,
            dateDisplayFormat: column.tb.dateDisplayFormat,
            dateOriginFormat: column.tb.dateOriginFormat,
            dateTimeDisplayFormat: column.tb.dateTimeDisplayFormat,
            dateTimeOriginFormat: column.tb.dateTimeOriginFormat,
            exportable: column.tb.exportable !== undefined ? column.tb.exportable : true,
            filterable: column.tb.hasOwnProperty('filterable') ? column.tb.filterable : true,
            isKey: column.tb.isKey ? column.tb.isKey : false,
            isComputed: column.tb.isComputed !== undefined ? column.tb.isComputed : false,
            getComputedStringValue: column.tb.getComputedStringValue || null,
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

        return tbColumn;
    });
};

const completeInitialFabricColumns = (fabricColumns: ITbColumn[], tbColumns: ColumnModel[]) => {
    return fabricColumns.map((column) => {
        const tbColumn = tbColumns.find((c) => c.name === column.fieldName);
        column.tb = { ...tbColumn };
        column.isFiltered = columnHasFilter(tbColumn);
        column.isSorted = tbColumn.sortDirection !== ColumnSortDirection.None;
        column.isSortedDescending = column.isSorted ? tbColumn.sortDirection === ColumnSortDirection.Descending : false;

        return column;
    });
};

export const useTbFabric = (
    initColumns: ITbColumn[],
    source: string | Request | TubularHttpClientAbstract | any[],
    tubularOptions?: Partial<ITbOptions>,
): ITbFabricInstance => {
    const { deps, ...rest } = tubularOptions;
    const tbInitColumns = React.useMemo(() => createInitialTbColumns(initColumns), [initColumns]);
    const initFabricColumns = React.useMemo(() => completeInitialFabricColumns(initColumns, tbInitColumns), [
        initColumns,
        tbInitColumns,
    ]);

    const { state: tbState, api: tbApi } = useTubular(tbInitColumns, source, rest);
    const [fabricColumns, setFabricColumns] = React.useState(initFabricColumns);
    const [list, setListState] = React.useState({
        initialized: false,
        // We need to hold all the items that we have loaded
        // This will be a cumulated of all of the rows from tubular instance
        items: [null],
    });

    // Reset list is required
    const resetList = () => {
        setListState({ initialized: true, items: [null] });
    };

    const sortByColumn = (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => {
        const tbColumn = tbState.columns.find((c) => c.name === column.fieldName);

        if (!tbColumn.sortable) {
            return;
        }

        unstable_batchedUpdates(() => {
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
            tbApi.sortColumn(column.fieldName);
        });
    };

    const search = (value: string) => {
        unstable_batchedUpdates(() => {
            resetList();
            tbApi.updateSearchText(value);
        });
    };

    const updateVisibleColumns = (columns: ColumnModel[]): [ITbColumn[], ColumnModel[]] => {
        const newFabricColumns = [...fabricColumns];
        columns.forEach((tbColumn) => {
            const fabricColumn = newFabricColumns.find((c) => c.fieldName === tbColumn.name);
            fabricColumn.tb.visible = tbColumn.visible;
            fabricColumn.isFiltered = columnHasFilter(tbColumn);
        });

        return [newFabricColumns, columns];
    };

    const loadMoreItems = (pageToLoad: number) => {
        tbApi.goToPage(pageToLoad);
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
        const newFabricColumns = [...fabricColumns];
        const fabricColumn = newFabricColumns.find((f) => f.fieldName === columnName);
        fabricColumn.isFiltered = value !== null;

        const newColumns = tbState.columns.map((column) => {
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
            resetList();
            setFabricColumns(newFabricColumns);
            tbApi.setColumns(newColumns);
        });
    };

    const applyFilter = (columnName: string, value: string) => applyOrResetFilter(columnName, value);

    const applyFeatures = (columns: ColumnModel[]) => {
        const result = updateVisibleColumns(columns);
        const tbColumns = applyFilters(result[1]);

        unstable_batchedUpdates(() => {
            setFabricColumns(result[0]);
            resetList();
            tbApi.setColumns(tbColumns);
        });
    };

    const clearFilter = (columnName: string) => applyOrResetFilter(columnName, null);

    const fabricColumnsMapper = (item) => {
        const mapped: any = {};
        const tbColumns = tbState.columns;

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
            if (tbState.error) {
                return {
                    items: [],
                    initialized: true,
                };
            }

            // We don't want to override the state for shimmer
            if (tbState.data.length === 0 && !state.initialized) {
                return {
                    ...state,
                    initialized: true,
                };
            }

            const mapped = tbState.data.map(fabricColumnsMapper);

            let newItems = [...state.items].slice(0, -1).concat(mapped);

            if (newItems.length < tbState.filteredRecordCount) {
                newItems = newItems.concat(null);
            }

            return {
                ...state,
                items: newItems,
            };
        });
    }, [tbState.data, tbState.error]);

    const listDeps = deps || [];

    React.useEffect(() => {
        resetList();
    }, listDeps);

    const api: ITbFabricApi = {
        ...tbApi,
        loadMoreItems,
        search,
        sortByColumn,
        applyFilters,
        applyFilter,
        clearFilter,
        updateVisibleColumns,
        applyFeatures,
        reloadGrid: () => {
            resetList();
            tbApi.reloadGrid(true);
        },
    };

    const filteredFabricColumns = React.useMemo(() => fabricColumns.filter((c) => c.tb.visible), [fabricColumns]);

    const state = {
        ...tbState,
        list: { items: list.items },
        fabricColumns: filteredFabricColumns,
    };

    return {
        api,
        state,
    } as ITbFabricInstance;
};
