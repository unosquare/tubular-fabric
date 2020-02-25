import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { Dialog } from 'office-ui-fabric-react/lib/components/Dialog/Dialog';
import { DialogContent } from 'office-ui-fabric-react/lib/components/Dialog/DialogContent';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog/DialogFooter';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';
import { FilterField } from './FilterField';
import { DialogType } from 'office-ui-fabric-react/lib/components/Dialog';

export interface IFiltersProps {
    columns: ColumnModel[];
    applyFilters: (columns: ColumnModel[]) => void;
    close: () => void;
}
export const FiltersDialog: React.FunctionComponent<IFiltersProps> = (props: IFiltersProps) => {
    const { columns, applyFilters, close } = props;
    const copyOfCoumns = columns.map(c => ({
        ...c,
        filter: {
            ...c.filter,
        },
    }));

    const [tempColumns] = React.useState(copyOfCoumns);

    return (
        <Dialog
            hidden={false}
            onDismiss={() => close()}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'Filters',
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
            {tempColumns
                .filter(c => c.visible && c.filterable)
                .map(column => {
                    return <FilterField key={column.name} column={column} />;
                })}
            <DialogFooter>
                <PrimaryButton
                    onClick={() => {
                        applyFilters(tempColumns);
                        close();
                    }}
                    text="Apply"
                />
                <DefaultButton onClick={close} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
