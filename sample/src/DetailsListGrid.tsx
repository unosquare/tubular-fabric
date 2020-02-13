import * as React from 'react';
import { DetailsList, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { columns } from './ColumnsDefinition';
import { IDetailsRowProps } from 'office-ui-fabric-react';
import { useTbFabric } from '../../src/useTbFabric';

const DetailsListGrid: React.FunctionComponent = () => {
    const tbFabricInstance = useTbFabric(columns, 'https://tubular.azurewebsites.net/api/orders/paged', {
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
