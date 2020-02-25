import * as React from 'react';
import TbDetailsList from '../../src/TbDetailsList';
import { columns } from './ColumnsDefinition';

export const TbDetailsListSample: React.FunctionComponent<any> = () => {
    return <TbDetailsList columns={columns} source="https://tubular.azurewebsites.net/api/orders/paged" />;
};
