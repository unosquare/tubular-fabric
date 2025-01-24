import { Checkbox, TableBody, TableCell, TableRow, TableSelectionCell } from '@fluentui/react-components';
import * as React from 'react';
import { ITbInfiniteListInstance } from './useTbInfiniteList';
import { TbSelection } from './Selection';
import { ColumnDataType, ColumnModel, getColumnAlign, parseDateColumnValue } from 'tubular-common';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

export const formatDate = (date: Date) =>
    date.toLocaleString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export const formatDateTime = (date: Date) =>
    date.toLocaleString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

export const renderCellContent: any = (column: ColumnModel, row: any) => {
    const value = row[column.name];
    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return value || 0;
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            const dateAsString = !value ? '' : parseDateColumnValue(column, value);
            return dateAsString;
        case ColumnDataType.Boolean:
            return value === true ? 'Yes' : 'No';
        default:
            return value;
    }
};

export const renderDefaultListItem: any = (columns: ColumnModel[], row: any) =>
    columns
        .filter((col: ColumnModel) => col.visible)
        .map((column: ColumnModel) => <div key={column.name}>{renderCellContent(column, row)}</div>);

const getColumnAlignProxy = (column: ColumnModel) => {
    const value = getColumnAlign(column);
    return value === 'inherit' ? 'left' : value;
};
export const renderCells: any = (columns: ColumnModel[], row: any) =>
    columns
        .filter((col: ColumnModel) => col.visible)
        .map((column: ColumnModel) => (
            <TableCell align={getColumnAlignProxy(column)} key={column.name}>
                {renderCellContent(column, row)}
            </TableCell>
        ));

export interface TbBodyProps<TItem> {
    tbTableInstance: ITbInfiniteListInstance<TItem>;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    rowSelectionEnabled?: boolean;
    onRowClick?(row: any): void;
    selection?: TbSelection;
}

export interface TbRowProps {
    row: any;
    rowIndex: number;
    columns: ColumnModel[];
    onRowClick?(): void;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    style: React.CSSProperties;
}

export const TbRow: React.FunctionComponent<TbRowProps> = ({
    row,
    columns,
    onRowClick,
    rowSelectionEnabled,
    selection,
    style,
}: TbRowProps) => {

    const proxyClick = () => {
        if (rowSelectionEnabled && selection) {
            selection?.toggleRowSelection(row[columns.find((c) => c.isKey)!.name]);
        }
    };
    return (
        <>
            <TableRow onClick={proxyClick} style={style}>
                {rowSelectionEnabled && selection && (
                    <TableSelectionCell
                        subtle
                        checked={selection.rowSelection[row[columns.find((c) => c.isKey)!.name]]}
                        checkboxIndicator={{ 'aria-label': 'Select row' }}
                    />
                )}
                {renderCells(columns, row)}
            </TableRow>
        </>
    );
};

export const TbBody = <TItem,>(props: TbBodyProps<TItem>) => {
    const { tbTableInstance, rowSelectionEnabled, selection, rowComponent } = props;
    const { state } = tbTableInstance;

    const RowComponent = rowComponent ? rowComponent : TbRow;
    const columnKey = tbTableInstance.state.columns.find((c) => c.isKey) || tbTableInstance.state.columns[0];

    const { items, hasNextPage } = tbTableInstance.state.list;

    // This cache is enabling better performance when it comes to reload
    // previously loaded items.
    const noRecordsFound = !hasNextPage && !tbTableInstance.state.isLoading && items.length === 0;

    const loadNextPage = (startIndex, stopIndex) => {
        const pageToLoad = Math.ceil(stopIndex / (tbTableInstance.state.itemsPerPage - 1)) - 1;
        if (tbTableInstance.state.isLoading || pageToLoad <= tbTableInstance.state.page) {
            return;
        }

        tbTableInstance.api.goToPage(pageToLoad);

        // We're resolving immediately because tubular will take care of
        // updating the values once the request is complete.
        return Promise.resolve();
    };

    // We need a place holder to give user some feedback on what's happening
    const itemCount =
        tbTableInstance.state.isLoading || noRecordsFound || hasNextPage ? items.length + 1 : items.length;

    const loadMoreItems = loadNextPage;

    // Every row is loaded except for our Loading/NoRecordsFound indicator.
    const isItemLoaded = (index: number) => !hasNextPage || index < items.length;
    const Row = ({ index, style, data }) => {
        const row = items[index];
        const RowComponent = TbRow;

        if (!row) {
            return <div style={style}>Loading...</div>;
        }

        return (
            <RowComponent
                rowSelectionEnabled={rowSelectionEnabled}
                selection={selection}
                style={style}
                row={row}
                rowIndex={index}
                columns={tbTableInstance.state.columns}
            />
        );
    };

    return (
        <TableBody style={{ flex: '1 1 auto', display: 'flex' }}>
            <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
                {({ onItemsRendered, ref }) => (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className='List'
                                height={height}
                                itemCount={itemCount}
                                itemSize={30}
                                onItemsRendered={onItemsRendered}
                                ref={ref}
                                width={width}
                            >
                                {Row}
                            </List>
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        </TableBody>
    );
};
