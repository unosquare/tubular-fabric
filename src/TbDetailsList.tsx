import * as React from 'react';
import {
    DetailsList,
    IDetailsRowProps,
    DetailsRow,
    IDetailsRowStyleProps,
    IDetailsRowStyles,
} from '@fluentui/react/lib/DetailsList';
import { SelectionBar } from './SelectionBar';
import { Selection } from '@uifabric/utilities';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IColumn, ConstrainMode } from '@fluentui/react/lib/DetailsList';
import { ITbFabricInstance } from './interfaces/ITbFabricInstance';
import { IStyleFunctionOrObject, SelectionMode } from '@fluentui/react/lib/Utilities';
import { ShimmerCell } from './cells';
import { getRenderByDataType } from './utils';

export interface ITbDetailsListProps {
    tbFabricInstance: ITbFabricInstance;
    selectionMode?: number;
    onRemoveAction?: (selection: Selection) => void;
    onRenderItemColumn?: (item: any, index: number, column: IColumn) => React.ReactNode;
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
    tbFabricInstance,
    selectionMode,
    onRemoveAction,
    onRenderItemColumn,
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

        // We need to delay loadMoreItems since
        // we are at the render phase here.
        setTimeout(() => {
            tbFabricInstance.api.loadMoreItems(index);
        });

        return <DetailsRow {...newRowProps} item={DEFAULT_MISSING_ITEM} styles={shimmerWrapper} />;
    };

    const onInternalRenderItemColumn = (item: any, index: number, column: IColumn) => {
        if (item.value === '-1') {
            return <ShimmerCell />;
        }

        return onRenderItemColumn ? onRenderItemColumn(item, index, column) : getRenderByDataType(item, column);
    };

    return (
        <div className={classes.tbDetailsList} data-is-scrollable="true">
            {selectionMode && selectionMode !== SelectionMode.none && selectedRowsCount > 0 && (
                <SelectionBar selection={selection} onRemoveAction={onRemoveAction} />
            )}
            <DetailsList
                selection={selection}
                onRenderItemColumn={onInternalRenderItemColumn}
                constrainMode={ConstrainMode.unconstrained}
                items={tbFabricInstance.state.list.items}
                columns={tbFabricInstance.state.fabricColumns}
                onRenderMissingItem={handleMissingItems}
                selectionPreservedOnEmptyClick={true}
                onColumnHeaderClick={tbFabricInstance.api.sortByColumn}
                selectionMode={selectionMode || SelectionMode.none}
            />
        </div>
    );
};
