import * as React from 'react';
import { useTbFabric } from './useTbFabric';
import { IDetailsRowProps, DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
import { CommandBarBasicExample } from './TbCommandBar';
import { SelectionBar } from './SelectionBar';
import { Selection } from 'office-ui-fabric-react/lib/Utilities';
import { ITbColumn } from './ITbColumn';
import { TubularHttpClientAbstract } from 'tubular-common';

export interface ITbDetailsListProps {
    columns: ITbColumn[];
    source: string | Request | TubularHttpClientAbstract | {}[];
}

const TbDetailsList: React.FunctionComponent<ITbDetailsListProps> = ({ columns, source }: ITbDetailsListProps) => {
    const tbFabricInstance = useTbFabric(columns, source, {
        pagination: { itemsPerPage: 100 },
    });

    const [selectedRowsCount, setSelectedRowsCount] = React.useState(0);
    const [selection] = React.useState(
        new Selection({
            onSelectionChanged: () => {
                setSelectedRowsCount(selection.getSelectedCount());
            },
        }),
    );

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

    return (
        <div style={{ margin: 'auto', position: 'relative' }}>
            {selectedRowsCount > 0 && <SelectionBar selection={selection} onRemoveAction={() => console.log('a')} />}
            <CommandBarBasicExample
                columns={tbFabricInstance.state.columns}
                applyFilters={tbFabricInstance.api.applyFilters}
                updateVisibleColumns={tbFabricInstance.api.updateVisibleColumns}
            />
            <div style={{ overflow: 'auto' }}>
                <DetailsList
                    selection={selection}
                    items={tbFabricInstance.state.list.items}
                    columns={tbFabricInstance.state.fabricColumns}
                    onRenderMissingItem={handleMissingItems}
                    selectionPreservedOnEmptyClick={true}
                    onColumnHeaderClick={tbFabricInstance.api.sortByColumn}
                />
            </div>
        </div>
    );
};

export default TbDetailsList;
