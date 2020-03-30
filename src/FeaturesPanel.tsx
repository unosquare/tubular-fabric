import * as React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/components/Pivot';
import { ToggleColumns } from './ToggleColumns';
import { FiltersDialog } from './FiltersDialog';
import { ITbFabricInstance } from './interfaces';
import { ColumnModel } from 'tubular-common';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';

export interface FeaturesPanelProps {
    closePanel: () => void;
    tbFabricInstance: ITbFabricInstance;
}

const buttonStyles = { root: { marginRight: 8 } };

export const FeaturesPanel: React.FunctionComponent<FeaturesPanelProps> = ({ closePanel, tbFabricInstance }) => {
    const copyOfCoumns = [...tbFabricInstance.state.columns];
    const [tempColumns, setTempColumns] = React.useState(copyOfCoumns);

    // const openPanel = useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => closePanel());
    const onApplyClick = useConstCallback(() => {
        tbFabricInstance.api.updateVisibleColumns(tempColumns);
        // tbFabricInstance.api.applyFilters(tempColumns);
        dismissPanel();
    });

    const onRenderFooterContent = useConstCallback(() => (
        <div>
            <PrimaryButton onClick={onApplyClick} styles={buttonStyles}>
                Apply
            </PrimaryButton>
            <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
        </div>
    ));

    return (
        <Panel
            headerText="Grid features"
            // this prop makes the panel non-modal
            isBlocking={false}
            isOpen={true}
            onDismiss={dismissPanel}
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <Pivot aria-label="Count and Icon Pivot Example">
                <PivotItem itemID="columns" headerText="Columns" itemIcon="TripleColumn">
                    <ToggleColumns
                        columns={tempColumns}
                        setColumns={setTempColumns}
                        pristineColumns={tbFabricInstance.state.columns}
                    />
                </PivotItem>
                <PivotItem itemID="filters" headerText="Filters" itemIcon="Filter">
                    <FiltersDialog columns={tempColumns} setColumns={setTempColumns} />
                </PivotItem>
            </Pivot>
        </Panel>
    );
};
