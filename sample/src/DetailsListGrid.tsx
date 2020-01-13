import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { IColumnTRansformer } from './IColumTRansformer';
import { columnsTR } from './ColumnsDefinition';
import { ITbListInstance, useTbList, ITbOptions } from 'tubular-react-common';
import { ColumnModel, TubularHttpClient } from 'tubular-common';
import { Fabric } from 'office-ui-fabric-react';
import { IDetailsRowProps } from 'office-ui-fabric-react';
export interface TbListProps {
    tbInstance: ITbListInstance;
}

const DetailsListGrid: React.FunctionComponent<TbListProps> = () => {
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const tbInstance: ITbListInstance = useTbList(columnsTR, 'https://tubular.azurewebsites.net/api/orders/paged');

    React.useEffect(() => {
        getRows();
    }, [tbInstance.state.list.items]);

    const getRows = () => {
        setRows(tbInstance.state.list.items);
        setPage(tbInstance.state.page);
    };

    const loadNextPage = (): any => {
        alert('you are sclrolling');
        console.log('chaca chaca');
        // const pageToLoad = page + 1;
        // if (tbInstance.state.isLoading || page <= tbInstance.state.page) {
        //     return;
        // }

        // tbInstance.api.loadPage(pageToLoad);

        // // We're resolving immediately because tubular will take care of
        // // updating the values once the request is complete.
        // return Promise.resolve();
    };

    const delayedLoadNextpage = () => {
        alert('you are sclrolling delayedLoadNextpage');
        return loadNextPage();
    };

    // const handleMissingItems = (index?: number, rowProps?: IDetailsRowProps): React.ReactNode => {
    //     const DEFAULT_MISSING_ITEM = {
    //       key: 'missing',
    //       name: 'Missing Item',
    //       value: '-1'
    //     }
    //     return <Fabric.DetailsRow {...rowProps} item={DEFAULT_MISSING_ITEM} styles={{ root: { 'background': 'red', color: 'white' }}} />
    //   }

    return (
        <Fabric>
            <DetailsList
                items={rows}
                columns={IColumnTRansformer(columnsTR)}
                onRenderMissingItem={delayedLoadNextpage}
            />
        </Fabric>
    );
};

export default DetailsListGrid;
