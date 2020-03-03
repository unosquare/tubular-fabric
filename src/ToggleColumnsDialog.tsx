import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { Dialog } from 'office-ui-fabric-react/lib/components/Dialog/Dialog';
import { Toggle } from 'office-ui-fabric-react/lib/components/Toggle/Toggle';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog/DialogFooter';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';
import { DialogType } from 'office-ui-fabric-react/lib/components/Dialog';

export interface IToggleColumnsDialog {
    columns: ColumnModel[];
    applyColumnsChanges: (columns: ColumnModel[]) => void;
    close: () => void;
}
export const ToggleColumnsDialog: React.FunctionComponent<IToggleColumnsDialog> = (props: IToggleColumnsDialog) => {
    const { columns, applyColumnsChanges, close } = props;
    const copyOfCoumns = [...columns];

    const [tempColumns, setTempColumns] = React.useState(copyOfCoumns);

    return (
        <Dialog
            hidden={false}
            onDismiss={() => close()}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'Toggle Columns',
                closeButtonAriaLabel: 'Close',
            }}
            modalProps={{
                titleAriaId: this._labelId,
                subtitleAriaId: this._subTextId,
                isBlocking: false,
                styles: { main: { maxWidth: 500 } },
                dragOptions: undefined,
            }}
        >
            {tempColumns.map(column => {
                return (
                    <Toggle
                        key={column.name}
                        label={column.label}
                        checked={column.visible}
                        onText="On"
                        offText="Off"
                        onChange={(ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
                            const newColumns = tempColumns.map(c => {
                                if (c.name === column.name) {
                                    return {
                                        ...c,
                                        visible: checked,
                                    };
                                }

                                return { ...c };
                            });
                            setTempColumns(newColumns);
                        }}
                    />
                );
            })}
            <DialogFooter>
                <PrimaryButton
                    onClick={() => {
                        applyColumnsChanges(tempColumns);
                        close();
                    }}
                    text="Apply"
                />
                <DefaultButton onClick={close} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
