import * as React from 'react';
import { Panel, PivotItem, Pivot, PrimaryButton, DefaultButton } from '@fluentui/react';
import { ToggleColumns } from './ToggleColumns';
import { ColumnModel, CompareOperators, ColumnDataType } from 'tubular-common';
import { FiltersContainer } from './FiltersContainer';

export interface FeaturesPanelProps {
    closePanel: () => void;
    columns: ColumnModel[];
    onApplyFeatures: (columns: ColumnModel[]) => void;
    toggleColumns: boolean;
    filterable: boolean;
}

const buttonStyles = { root: { marginRight: 8 } };

const resolveFilterOperator = (column: ColumnModel): CompareOperators =>
    (column.filterOperator =
        column.filterOperator === CompareOperators.None
            ? column.dataType === ColumnDataType.String
                ? CompareOperators.Contains
                : CompareOperators.Equals
            : column.filterOperator);

const copyColumns = (columns: ColumnModel[]): ColumnModel[] =>
    columns.map((column) => ({
        ...column,
        filterOperator: resolveFilterOperator(column),
    }));

export const FeaturesPanel: React.FunctionComponent<FeaturesPanelProps> = ({
    closePanel,
    columns,
    onApplyFeatures,
    toggleColumns,
    filterable,
}: FeaturesPanelProps) => {
    const [tempColumns, setTempColumns] = React.useState(copyColumns(columns));

    const dismissPanel = React.useCallback(() => closePanel(), []);

    const onApplyClick = () => {
        onApplyFeatures(tempColumns);
        dismissPanel();
    };

    const onRenderFooterContent = () => (
        <>
            <PrimaryButton onClick={onApplyClick} styles={buttonStyles}>
                Apply
            </PrimaryButton>
            <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
        </>
    );

    React.useEffect(() => {
        setTempColumns(copyColumns(columns));
    }, [columns]);

    return (
        <Panel
            headerText='Grid features'
            // this prop makes the panel non-modal
            isBlocking={false}
            isOpen={true}
            elementToFocusOnDismiss={null}
            onDismiss={dismissPanel}
            closeButtonAriaLabel='Close'
            isHiddenOnDismiss={false}
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <Pivot>
                {filterable && (
                    <PivotItem itemID='filters' headerText='Filters' itemIcon='Filter'>
                        <FiltersContainer
                            columns={tempColumns.filter((x) => x.filterable && !x.isComputed)}
                            onApply={onApplyClick}
                        />
                    </PivotItem>
                )}
                {toggleColumns && (
                    <PivotItem itemID='columns' headerText='Columns' itemIcon='TripleColumn'>
                        <ToggleColumns columns={tempColumns} setColumns={setTempColumns} />
                    </PivotItem>
                )}
            </Pivot>
        </Panel>
    );
};
