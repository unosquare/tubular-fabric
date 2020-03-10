import * as React from 'react';
import { columns } from './ColumnsDefinition';
import { useTbFabric } from '../../src/useTbFabric';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { TbDetailsList } from '../../src/TbDetailsList';

const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});

const DetailsListWithSearch: React.FunctionComponent<any> = () => {
    const tbFabricInstance = useTbFabric(columns, 'https://tubular.azurewebsites.net/api/orders/paged', {
        pagination: { itemsPerPage: 100 },
    });

    const onSearch = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void =>
        tbFabricInstance.api.search(text);

    return (
        <div style={{ height: '600px', overflow: 'auto' }}>
            <TextField
                className={exampleChildClass}
                label="Search:"
                onChange={onSearch}
                styles={{ root: { maxWidth: '300px' } }}
            />
            <TbDetailsList
                instance={tbFabricInstance}
                options={{
                    filterable: true,
                    toggleColumns: true,
                    searchable: true,
                    pagination: {
                        itemsPerPage: 100,
                    },
                }}
            />
        </div>
    );
};

export default DetailsListWithSearch;
