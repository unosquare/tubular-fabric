import * as React from 'react';
import { DetailsList, IDetailsRowProps, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { IColumnTRansformer } from './IColumTRansformer';
import { columnsTR } from './ColumnsDefinition';
import { ITbListInstance, useTbList, ITbOptions } from 'tubular-react-common';
import { Fabric } from 'office-ui-fabric-react';

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
    const DEFAULT_MISSING_ITEM = {
        key: 'bannanas',
        OrderID: 'missing',
        CustomerName: 'Missing Item',
        ShipperCity: '-1',
        Amount: '-1',
      }
    const handleMissingItems = (index?: number, rowProps?: IDetailsRowProps): React.ReactNode => {
        // console.log('index', index);
        // console.log('rowProps', rowProps);
        const DEFAULT_MISSING_ITEM = {
          key: 'bannanas',
          OrderID: 'missing',
          CustomerName: 'Missing Item',
          ShipperCity: '-1',
          Amount: '-1',
        }
        alert('handleMissingItems');
        // const DEFAULT_MISSING_ITEM = {
        //   key: 'missing',
        //   name: 'Missing Item',
        //   value: '-1'
        // }
        return <DetailsRow {...rowProps} item={DEFAULT_MISSING_ITEM} styles={{ root: { 'background': 'red', color: 'white' }}} />
      }

    return (
            <DetailsList
                items={rows}
                columns={IColumnTRansformer(columnsTR)}
                onRenderMissingItem={handleMissingItems}
            />
    );
};

export default DetailsListGrid;
