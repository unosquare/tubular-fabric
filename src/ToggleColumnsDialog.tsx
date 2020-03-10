import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { Dialog } from 'office-ui-fabric-react/lib/components/Dialog/Dialog';
import { Toggle } from 'office-ui-fabric-react/lib/components/Toggle/Toggle';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog/DialogFooter';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';
import { DialogType, IDialogContentProps } from 'office-ui-fabric-react/lib/components/Dialog';

export interface IToggleColumnsDialog {
    columns: ColumnModel[];
    applyColumnsChanges: (columns: ColumnModel[]) => void;
    close: () => void;
}

const dialogContentProps: IDialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Toggle Columns',
    closeButtonAriaLabel: 'Close',
};

export const ToggleColumnsDialog: React.FunctionComponent<IToggleColumnsDialog> = (props: IToggleColumnsDialog) => {
    const { columns, applyColumnsChanges, close } = props;
    const copyOfCoumns = [...columns];

    const [tempColumns, setTempColumns] = React.useState(copyOfCoumns);

    const handleChange = (column: ColumnModel) => (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
        if (!checked && tempColumns.filter(c => !c.visible).length === tempColumns.length - 1) {
            return;
        }

        const newColumns = tempColumns.map(tempColumn => {
            if (tempColumn.name === column.name) {
                return {
                    ...tempColumn,
                    visible: checked,
                };
            }

            return { ...tempColumn };
        });

        setTempColumns(newColumns);
    };

    const onApply = () => {
        applyColumnsChanges(tempColumns);
        close();
    };

    const onDismiss = () => close();

    return (
        <Dialog
            hidden={false}
            onDismiss={onDismiss}
            dialogContentProps={dialogContentProps}
            modalProps={{
                titleAriaId: this._labelId,
                subtitleAriaId: this._subTextId,
                isBlocking: false,
                styles: { main: { maxWidth: 500 } },
                dragOptions: undefined,
            }}
        >
            {tempColumns.map(column => (
                <Toggle
                    key={column.name}
                    label={column.label}
                    checked={column.visible}
                    onText="On"
                    offText="Off"
                    onChange={handleChange(column)}
                />
            ))}
            <DialogFooter>
                <PrimaryButton onClick={onApply} text="Apply" />
                <DefaultButton onClick={close} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
