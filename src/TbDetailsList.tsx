import * as React from 'react';
import { IDetailsRowProps, DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
import { SelectionBar } from './SelectionBar';
import { Selection } from 'office-ui-fabric-react/lib/Utilities/selection/Selection';
import {
    IDetailsRowStyleProps,
    IDetailsRowStyles,
} from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow.types';
import { keyframes, mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IColumn, ConstrainMode } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ITbFabricInstance } from './interfaces/ITbFabricInstance';
import { IStyleFunctionOrObject, SelectionMode } from 'office-ui-fabric-react/lib/Utilities';

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

const holderAnimation = keyframes({
    '0%': {
        transform: 'translateX(-100%)',
    },
    '100%': {
        transform: 'translateX(100%)',
    },
});

const shimmer = keyframes({
    '0%': {
        backgroundPosition: '-1000px 0',
    },
    '100%': {
        backgroundPosition: '1000px 0',
    },
});

mergeStyles(shimmer);
mergeStyles(holderAnimation);

const classes = mergeStyleSets({
    tbDetailsList: { overflow: 'auto' },
    shimmerAnimate: {
        animationName: shimmer,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        background: 'linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)',
        backgroundSize: '1000px 100%',
        width: '100%',
        height: '100%',
    },
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
        tbFabricInstance.api.loadMoreItems(index);

        return <DetailsRow {...newRowProps} item={DEFAULT_MISSING_ITEM} styles={shimmerWrapper} />;
    };

    const onInternalRenderItemColumn = (item: any, index: number, column: IColumn) => {
        if (item.value === '-1') {
            return <div className={classes.shimmerAnimate}></div>;
        }

        return onRenderItemColumn ? onRenderItemColumn(item, index, column) : <span>{item[column.fieldName]}</span>;
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
