import * as React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/components/Pivot';
import { ToggleColumns } from './ToggleColumns';
import { FiltersDialog } from './FiltersDialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { ColumnModel, CompareOperators, ColumnDataType } from 'tubular-common';

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

const copyColumns = (columns: ColumnModel[]): ColumnModel[] => {
    return columns.map((column) => ({
        ...column,
        filterOperator: resolveFilterOperator(column),
    }));
};

export const FeaturesPanel: React.FunctionComponent<FeaturesPanelProps> = ({
    closePanel,
    columns,
    onApplyFeatures,
    toggleColumns,
    filterable,
}: FeaturesPanelProps) => {
    const [tempColumns, setTempColumns] = React.useState(copyColumns(columns));

    const dismissPanel = useConstCallback(() => closePanel());
    const onApplyClick = () => {
        onApplyFeatures(tempColumns);
        dismissPanel();
    };

    const onRenderFooterContent = () => (
        <div>
            <PrimaryButton onClick={onApplyClick} styles={buttonStyles}>
                Apply
            </PrimaryButton>
            <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
        </div>
    );

    React.useEffect(() => {
        setTempColumns(copyColumns(columns));
    }, [columns]);
    return (
        <Panel
            headerText="Grid features"
            // this prop makes the panel non-modal
            isBlocking={false}
            isOpen={true}
            elementToFocusOnDismiss={null}
            onDismiss={dismissPanel}
            closeButtonAriaLabel="Close"
            isHiddenOnDismiss={false}
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <Pivot aria-label="Count and Icon Pivot Example">
                {filterable && (
                    <PivotItem itemID="filters" headerText="Filters" itemIcon="Filter">
                        <FiltersDialog columns={tempColumns} onApply={onApplyClick} />
                    </PivotItem>
                )}
                {toggleColumns && (
                    <PivotItem itemID="columns" headerText="Columns" itemIcon="TripleColumn">
                        <ToggleColumns columns={tempColumns} setColumns={setTempColumns} />
                    </PivotItem>
                )}
            </Pivot>
        </Panel>
    );
};
