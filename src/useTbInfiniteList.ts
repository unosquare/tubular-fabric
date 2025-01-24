import * as React from 'react';
import { ColumnModel, TubularHttpClientAbstract } from 'tubular-common';
import { ITbApi, ITbOptions, ITbState, useTubular } from 'tubular-react-common';

export interface ITbListInternalState<TItem> {
    hasNextPage: boolean;
    items: TItem[];
}

export interface ITbInfiniteListState<TItem> extends ITbState {
    infiniteLoaderRef: React.RefObject<{ resetLoadMoreRowsCache: (x: boolean) => void }>;
    list: ITbListInternalState<TItem>;
}

export interface ITbInfiniteListInstance<TItem> {
    state: ITbInfiniteListState<TItem>;
    api: ITbApi;
}

const useTbInfiniteList = <TItem>(
    initColumns: ColumnModel[],
    source: TItem[] | string | Request | TubularHttpClientAbstract,
    tubularOptions: Partial<ITbOptions> = {
        pagination: {
            itemsPerPage: 200,
        },
    },
): ITbInfiniteListInstance<TItem> => {
    const tubular = useTubular(initColumns, source, tubularOptions);
    const infiniteLoaderRef = React.useRef<{ resetLoadMoreRowsCache: (x: boolean) => void }>(null);

    const [list, setListState] = React.useState({
        hasNextPage: false,
        // We need to hold all the items that we have loaded
        // This will be a cumulated of all of the rows from tubular instance
        items: [] as TItem[],
    });

    // Reset list is required to flush cache from
    // Infinite loader
    const resetList = () => {
        if (infiniteLoaderRef.current) infiniteLoaderRef.current.resetLoadMoreRowsCache(true);

        setListState({ hasNextPage: false, items: [] });
        tubular.api.goToPage(0);
    };

    const sortByColumn = (columnName: string) => {
        resetList();
        tubular.api.sortColumn(columnName);
    };

    const search = (value: string) => {
        resetList();
        tubular.api.updateSearchText(value);
    };

    React.useEffect(() => {
        if (!tubular.state.data) return;

        setListState((state) => ({
            hasNextPage: state.items.length + (tubular.state.data?.length ?? 0) < tubular.state.filteredRecordCount,

            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            items: [...state.items, ...(tubular.state.data! as TItem[])],
        }));
    }, [tubular.state.data, tubular.state.filteredRecordCount]);

    return {
        // API fort a list should be simpler than
        // the one used for a grid
        api: { ...tubular.api, sortColumn: sortByColumn },
        state: {
            ...tubular.state,
            // This is the ref that will be binded
            // to the actual infinite loader component
            infiniteLoaderRef,
            list,
        },
    };
};

export default useTbInfiniteList;
