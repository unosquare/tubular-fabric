import * as React from 'react';
import { DetailsList, DetailsRow, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { columns } from './ColumnsDefinition';
import { IDetailsRowProps } from 'office-ui-fabric-react';
import { useTbFabric } from '../../src/useTbFabric';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px'
});

const DetailsListWithSearch: React.FunctionComponent<any> = () => { 
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

    const onSearch = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => tbFabricInstance.api.search(text);

    return (
        <div style={{ height: '600px', overflow: 'auto' }}>
            <TextField
                className={exampleChildClass}
                label="Search:"
                onChange={onSearch}
                styles={{ root: { maxWidth: '300px' } }}
            />
            <DetailsList
                items={tbFabricInstance.state.list.items}
                columns={tbFabricInstance.state.fabricColumns}
                onRenderMissingItem={handleMissingItems}
                onColumnHeaderClick={tbFabricInstance.api.sortByColumn}
            />
        </div>
    );
};

export default DetailsListWithSearch;
