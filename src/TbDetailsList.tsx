import * as React from 'react';
import {
    DetailsList,
    IDetailsRowProps,
    DetailsRow,
    IDetailsRowStyleProps,
    IDetailsRowStyles,
    mergeStyleSets,
    IColumn,
    ConstrainMode,
    IStyleFunctionOrObject,
    SelectionMode,
    Selection,
} from '@fluentui/react';
import { SelectionBar } from './SelectionBar';
import { ShimmerCell } from './cells';
import { getRenderByDataType } from './utils';
import { IFabricTbState, ITbFabricApi } from './interfaces';

export interface ITbDetailsListProps {
    tbState: IFabricTbState;
    tbApi: ITbFabricApi;
    selectionMode?: number;
    onRemoveAction?: (selection: Selection) => void;
    onRenderItemColumn?: (item: any, index: number, column: IColumn) => React.ReactNode;
    shimmerRowCount?: number;
}

export const DEFAULT_MISSING_ITEM = {
    key: 'missing',
    name: 'Missing Item',
    value: '-1',
};

const classes = mergeStyleSets({
    tbDetailsList: { overflow: 'auto' },
});

const shimmerWrapper: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles> = {
    root: {
        animation: 'fullView 0.5s forwards cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    },
};

export const TbDetailsList: React.FunctionComponent<ITbDetailsListProps> = ({
    tbState,
    tbApi,
    selectionMode,
    onRemoveAction,
    onRenderItemColumn,
    shimmerRowCount = 5,
}: ITbDetailsListProps) => {
    const [selectedRowsCount, setSelectedRowsCount] = React.useState(0);
    const [selection] = React.useState(
        new Selection({
            onSelectionChanged: () => {
                // TODO: Check why this is being called on initial render
                // but not being called on fabric sample
                // see: https://developer.microsoft.com/en-us/fabric#/controls/web/detailslist
                if (selectedRowsCount !== selection.getSelectedCount()) {
                    setSelectedRowsCount(selection.getSelectedCount());
                }
            },
        }),
    );

    const handleMissingItems = (index?: number, rowProps?: IDetailsRowProps): React.ReactNode => {
        const newRowProps: IDetailsRowProps = { ...rowProps };

        // Tubular core will load the first page by default
        // That's why we don't need to do any call for the first
        // page set
        const pageToLoad = Math.ceil(index / tbState.itemsPerPage);

        if (index >= tbState.itemsPerPage && !tbState.isLoading && pageToLoad > tbState.page) {
            // We need to delay loadMoreItems since
            // we are at the render phase here.
            setTimeout(() => {
                tbApi.loadMoreItems(pageToLoad);
            });
        }

        return [...Array(shimmerRowCount)].map((value, index) => (
            <DetailsRow
                key={`shimmer-row-${index}`}
                {...newRowProps}
                item={DEFAULT_MISSING_ITEM}
                styles={shimmerWrapper}
            />
        ));
    };

    const onInternalRenderItemColumn = (item: any, index: number, column: IColumn) => {
        if (item.value === '-1') {
            return <ShimmerCell />;
        }

        return onRenderItemColumn ? onRenderItemColumn(item, index, column) : getRenderByDataType(item, column);
    };

    const onColumnHeaderClick = React.useCallback(
        () => (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => {
            if (!tbState.isLoading) {
                tbApi.sortByColumn(ev, column);
            }
        },
        [tbState.isLoading],
    );

    return (
        <div className={classes.tbDetailsList} data-is-scrollable="true">
            {selectionMode !== SelectionMode.none && selectedRowsCount > 0 && (
                <SelectionBar selection={selection} onRemoveAction={onRemoveAction} />
            )}
            <DetailsList
                selection={selection}
                onRenderItemColumn={onInternalRenderItemColumn}
                constrainMode={ConstrainMode.unconstrained}
                items={tbState.list.items}
                columns={tbState.fabricColumns}
                onRenderMissingItem={handleMissingItems}
                selectionPreservedOnEmptyClick={true}
                onColumnHeaderClick={onColumnHeaderClick()}
                selectionMode={selectionMode || SelectionMode.none}
            />
        </div>
    );
};
