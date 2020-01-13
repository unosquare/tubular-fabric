import * as React from 'react';
import { useTbList } from 'tubular-react-common';
import { columnsTR } from './ColumnsDefinition';
import DetailsListGrid from './DetailsListGrid';

const DetailListExample: React.FunctionComponent = () => {

    const tbList = useTbList(columnsTR, 'https://tubular.azurewebsites.net/api/orders/paged');

    return (<DetailsListGrid tbInstance={tbList} />);
};

export default DetailListExample;