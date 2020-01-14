import * as React from 'react';
import { DetailsList, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { IColumnTRansformer } from './IColumTRansformer';
import { columnsTR } from './ColumnsDefinition';
import { ITbListInstance, ITbOptions, useTubular } from 'tubular-react-common';
import { ColumnModel, TubularHttpClientAbstract } from 'tubular-common';
import { IDetailsRowProps } from 'office-ui-fabric-react';
export interface TbListProps {
    tbInstance: ITbListInstance;
}

const useTbFabric = (
    initColumns: ColumnModel[],
    source: string | Request | TubularHttpClientAbstract | {}[],
    tubularOptions?: Partial<ITbOptions>,
) => {
    const tubular = useTubular(initColumns, source, tubularOptions);
    const [list, setListState] = React.useState({
        hasNextPage: false,
        // We need to hold all the items that we have loaded
        // This will be a cumulated of all of the rows from tubular instance
        items: [],
    });

    // Reset list is required to flush cache from
    // Infinite loader
    const resetList = () => {
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

                mapped['key'] = `Order_${item.OrderID}`;
                mapped['name'] = `Order_${item.OrderID}`;

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
        },
    };
};

const DetailsListGrid: React.FunctionComponent<any> = () => {
    const tbFabricInstance = useTbFabric(columnsTR, 'https://tubular.azurewebsites.net/api/orders/paged', {
        pagination: { itemsPerPage: 100 },
    });

    const handleMissingItems = (index?: number, rowProps?: IDetailsRowProps): React.ReactNode => {
        const DEFAULT_MISSING_ITEM = {
            key: 'missing',
            name: 'Missing Item',
            value: '-1',
        };

        tbFabricInstance.api.loadMoreItems(index);

        return (
            <DetailsRow
                {...rowProps}
                item={DEFAULT_MISSING_ITEM}
                styles={{ root: { background: 'red', color: 'white' } }}
            />
        );
    };

    if (tbFabricInstance.state.list.items.length === 0) return null;

    return (
        <div style={{ height: '200px', overflow: 'auto' }}>
            <DetailsList
                items={tbFabricInstance.state.list.items}
                columns={IColumnTRansformer(columnsTR)}
                onRenderMissingItem={handleMissingItems}
            />
        </div>
    );
};

export default DetailsListGrid;
