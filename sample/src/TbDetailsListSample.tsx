import * as React from 'react';
import TbDetailsList from '../../src/TbDetailsList';
import { columns } from './ColumnsDefinition';
import { useGridRefresh } from 'tubular-react-common/dist/useGridRefresh';

export const TbDetailsListSample: React.FunctionComponent<any> = () => {
    const [refresh, forceRefresh] = useGridRefresh();
    const onForceRefresh = () => {
        forceRefresh();
    };

    return (
        <>
            <div>
                <button type="button" onClick={onForceRefresh}>
                    Force refresh
                </button>
            </div>
            <TbDetailsList
                columns={columns}
                source="https://tubular.azurewebsites.net/api/orders/paged"
                tbOptions={{
                    deps: [refresh],
                }}
            />
        </>
    );
};
