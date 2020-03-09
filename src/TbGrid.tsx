import * as React from 'react';
import { useTbFabric } from './useTbFabric';
import { IDetailsRowProps, DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
import { TbCommandBar } from './TbCommandBar';
import { SelectionBar } from './SelectionBar';
import { Selection, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { ITbColumn } from './ITbColumn';
import { TubularHttpClientAbstract } from 'tubular-common';
import {
    IDetailsRowStyleProps,
    IDetailsRowStyles,
} from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow.types';
import { keyframes, mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { ITbOptions } from 'tubular-react-common/dist/types/ITbOptions';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types';

export interface ITbExtendedOptions extends ITbOptions {
    onRemoveAction?: (selection: Selection) => void;
    filterable: boolean;
    searchable: boolean;
    toggleColumns: boolean;
    hiddeCommandBar: boolean;
    commandBarItems?: ICommandBarItemProps[];
}

export interface ITbGridProps {
    columns: ITbColumn[];
    source: string | Request | TubularHttpClientAbstract | {}[];
    options: Partial<ITbExtendedOptions>;
    onRenderItemColumn?: (item: any, index: number, column: IColumn) => React.ReactNode;
}

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
    tbContainer: { margin: 'auto', display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
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

export const TbGrid: React.FunctionComponent<ITbDetailsListProps> = ({
    columns,
    source,
    options,
    onRenderItemColumn,
}: ITbGridProps) => {
    const tbFabricInstance = useTbFabric(columns, source, options);

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
        const DEFAULT_MISSING_ITEM = {
            key: 'missing',
            name: 'Missing Item',
            value: '-1',
        };

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
        <div className={classes.tbContainer}>
            {selectedRowsCount > 0 && <SelectionBar selection={selection} onRemoveAction={options.onRemoveAction} />}
            {!options.hiddeCommandBar && (
                <TbCommandBar
                    filterable={options.filterable}
                    searchable={options.searchable}
                    toggleColumns={options.toggleColumns}
                    items={options.commandBarItems}
                    columns={tbFabricInstance.state.columns}
                    onSearch={tbFabricInstance.api.search}
                    onApplyFilters={tbFabricInstance.api.applyFilters}
                    onUpdateVisibleColumns={tbFabricInstance.api.updateVisibleColumns}
                />
            )}
            <div className={classes.tbDetailsList} data-is-scrollable="true">
                <DetailsList
                    selection={selection}
                    onRenderItemColumn={onInternalRenderItemColumn}
                    items={tbFabricInstance.state.list.items}
                    columns={tbFabricInstance.state.fabricColumns}
                    onRenderMissingItem={handleMissingItems}
                    selectionPreservedOnEmptyClick={true}
                    onColumnHeaderClick={tbFabricInstance.api.sortByColumn}
                />
            </div>
        </div>
    );
};
