import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useTubular } from 'tubular-react-common';
import { TubularHttpClientAbstract } from 'tubular-common/dist/Http';
import { ITbOptions } from 'tubular-react-common/dist/types';
import {
    ColumnModel,
    ColumnSortDirection,
    CompareOperators,
    createColumn,
    columnHasFilter,
} from 'tubular-common/dist/Models';
import { IColumn } from '@fluentui/react';
import { ITbColumnProxy } from './interfaces/ITbColumn';
import { ITbFabricInstance } from './interfaces/ITbFabricInstance';
import { ITbFabricApi } from './interfaces';

const createInitialTbColumns = (proxyColumns: ITbColumnProxy[]): ColumnModel[] =>
    proxyColumns.map((column) =>
        createColumn(column.name, {
            dataType: column.dataType,
            dateDisplayFormat: column.dateDisplayFormat,
            dateOriginFormat: column.dateOriginFormat,
            dateTimeDisplayFormat: column.dateTimeDisplayFormat,
            dateTimeOriginFormat: column.dateTimeOriginFormat,
            exportable: column.exportable !== undefined ? column.exportable : true,
            filterable: Object.hasOwnProperty.call(column, 'filterable') ? column.filterable : true,
            isKey: column.isKey ? column.isKey : false,
            isComputed: column.isComputed !== undefined ? column.isComputed : false,
            getComputedStringValue: column.getComputedStringValue || null,
            label: column.label ? column.label : (column.name || '').replace(/([a-z])([A-Z])/g, '$1 $2'),
            searchable: column.searchable ? column.searchable : false,
            sortDirection: column.sortDirection ? column.sortDirection : ColumnSortDirection.None,
            sortOrder: column.sortOrder ? column.sortOrder : -1,
            sortable: column.sortable ? column.sortable : false,
            visible: Object.hasOwnProperty.call(column, 'visible') ? column.visible : true,
            filterText: column.filterText,
            filterArgument: column.filterArgument,
            filterOperator: column.filterOperator || CompareOperators.None,
        }),
    );

const mapToFabricColumns = (tbColumns: ColumnModel[]): Partial<IColumn>[] =>
    tbColumns.map((column) => {
        return {
            key: column.name!,
            name: column.label,
            isFiltered: columnHasFilter(column),
            isSorted: column.sortDirection !== ColumnSortDirection.None,
            isSortedDescending:
                column.sortDirection !== ColumnSortDirection.None
                    ? column.sortDirection === ColumnSortDirection.Descending
                    : false,
        };
    });

const useTbFabric = (
    initColumns: ITbColumnProxy[],
    source: string | Request | TubularHttpClientAbstract | any[],
    tubularOptions?: Partial<ITbOptions>,
): ITbFabricInstance => {
    const { deps, ...rest } = tubularOptions;
    const tbColumns = React.useMemo(() => createInitialTbColumns(initColumns), [initColumns]);
    const { state: tbState, api: tbApi } = useTubular(tbColumns, source, rest);
    const [list, setListState] = React.useState({
        initialized: false,
        // We need to hold all the items that we have loaded
        // This will be a cumulated of all of the rows from tubular instance
        items: [null],
    });

    const isCtrlKeyPressed = React.useRef<boolean>(false);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Control' && !isCtrlKeyPressed.current) {
            isCtrlKeyPressed.current = true;
        }
    };

    const handleKeyUp = (event: any) => {
        if (event.key === 'Control' && isCtrlKeyPressed) {
            isCtrlKeyPressed.current = false;
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Reset list is required
    const resetList = () => setListState({ initialized: true, items: [null] });

    const sortByColumn = (ev?: React.MouseEvent<HTMLElement>, column?: ColumnModel, isMultiSort = false) => {
        const tbColumn = tbState.columns.find((c) => c.name === column.name);
        isMultiSort = isMultiSort || isCtrlKeyPressed.current;

        if (!tbColumn.sortable) {
            return;
        }

        unstable_batchedUpdates(() => {
            resetList();

            tbApi.sortColumn(column.name, isMultiSort);
        });
    };

    const search = (value: string) =>
        unstable_batchedUpdates(() => {
            resetList();
            tbApi.updateSearchText(value);
        });

    const loadMoreItems = (pageToLoad: number) => tbApi.goToPage(pageToLoad);

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
        const newColumns = tbState.columns.map((column) => {
            if (column.name === columnName) {
                return {
                    ...column,
                    filterText: value,
                    filterOperator: value ? CompareOperators.Equals : CompareOperators.None,
                    filterArgument: value ? [] : null,
                };
            }

            return column;
        });

        unstable_batchedUpdates(() => {
            resetList();
            tbApi.setColumns(newColumns);
        });
    };

    const applyFilter = (columnName: string, value: string) => applyOrResetFilter(columnName, value);

    const applyFeatures = (columns: ColumnModel[]) => {
        unstable_batchedUpdates(() => {
            resetList();
            tbApi.setColumns(columns);
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
        applyFeatures,
        reloadGrid: () => {
            resetList();
            tbApi.reloadGrid(true);
        },
    };

    const filteredFabricColumns = React.useMemo(
        () => mapToFabricColumns(tbState.columns.filter((c) => c.visible)),
        [tbState.columns],
    );

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

export default useTbFabric;
